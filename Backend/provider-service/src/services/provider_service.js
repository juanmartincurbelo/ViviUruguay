const fetch = require("node-fetch");
const validator = require("validator");
const bcrypt = require('bcrypt');
const fs = require("fs");
const path = require("path");

const config = require("../config/config");
const configStruct = config.getConfig();

const { EventValidationPipeline } = require("../Pipes&Filters/Pipes/EventValidatorPipeline");
const { EventError, InvalidTokenError, BadRequestError, EventValidationError, EventNotFoundError, ForbiddenError } = require("../errors/providers_errors");
const providerRepository = require("../repositories/provider_repository");
const logger = require("../../../utils/logger");
const { createLogEntry } = require('../../../utils/common');

var Queue = require('bull');
var eventDataQueue = new Queue(
  configStruct.redis.event_data_queue,
  `redis://${configStruct.redis.host}:${configStruct.redis.port}`,
);

const createEvent = async (eventData, files) => {
  try {
    const event = await validateEvent(eventData, files);
    event.receivers = [];
    const finalEvent = await addFilesInfo(event, files);
    const user = await providerRepository.getProvider(eventData.provider_id);
    const savedEvent = await providerRepository.createEvent(finalEvent, user.defaultPrice);
    const logEntry = createLogEntry("Event creation", user)
    logger.application(logEntry);
    return savedEvent;
  } catch (error) {
    logger.error("Failed to create event.", { message: error.message, status: error.status, userType: 'Provider' });
    deleteDirectoryAndFiles(files);
    throw new EventError(error.status, error.message);
  }
};

const updateEventInfo = async (eventName, providerId, eventData) => {
  try {
    const event = await validateUpdate(eventName, providerId);
    await validateInputInfo(eventData);
    const updatedEvent = updateEventInputInfo(event, eventData);
    const authorizedEvent = await eventAuthorization(updatedEvent, "update");
    const updatedFilesEvent = await updateFilesRoute(authorizedEvent);
    const savedEvent = await providerRepository.updateEvent(eventName, updatedFilesEvent);

    const user = await providerRepository.getProvider(providerId);
    const logEntry = createLogEntry("Event modification", user)
    logger.application(logEntry);

    return savedEvent;
  } catch (error) {
    logger.error("Failed to update event information.", { message: error.message, status: error.status, userType: 'Provider' });
    throw new EventError(error.status, error.message);
  }
};

const updateEventFiles = async (eventName, providerId, files) => {
  try {
    const event = await validateUpdate(eventName, providerId);
    await validateInputFiles(files);
    const updatedEvent = await updateFilesInfo(event, files);
    const savedEvent = await providerRepository.updateEvent(eventName, updatedEvent);

    const user = await providerRepository.getProvider(providerId);
    const logEntry = createLogEntry("Event modification", user)
    logger.application(logEntry);

    return savedEvent;
  } catch (error) {
    logger.error("Failed to update event files.", { message: error.message, status: error.status, userType: 'Provider' });
    throw new EventError(error.status, error.message);
  }
};

const updateFilesInfo = (event, files) => {
  try {
    if (files.mainImage) {
      const mainImagePath = path.join(event.filesRoute, event.mainImage);
      event.mainImage = files.mainImage[0].filename;
      fs.unlinkSync(mainImagePath);
    }
    if (files.previewImage) {
      const previewImagePath = path.join(event.filesRoute, event.previewImage);
      event.previewImage = files.previewImage[0].filename;
      fs.unlinkSync(previewImagePath);
    }
    return event;
  } catch (error) {
    logger.error("Failed to update files info.", { message: error.message, status: error.status, userType: 'Provider' });
    throw new EventError("Failed to update files info.");
  }
}

const validateInputFiles = async (files) => {
  if (!files) {
    throw new BadRequestError("Files are required.");
  }
}

const updateFilesRoute = async (event) => {
  try {
    const oldPath = event.filesRoute;
    console.log(oldPath)
    const newPath = path.join(__dirname, '../../..', 'uploads', event.name);
    fs.renameSync(oldPath, newPath);
    event.filesRoute = newPath;
    return event;
  } catch (error) {
    console.log(error);
    logger.error("Failed to update files route.", { message: error.message, status: error.status, userType: 'Provider' });
    throw new EventError("Failed to update files route.");
  }
}

const validateUpdate = async (eventName, providerId) => {
  const event = await providerRepository.getEventByName(eventName);
  if (!event) {
    throw new EventNotFoundError("The event that you are trying to update does not exist.");
  }
  if (event.provider_id != providerId) {
    throw new ForbiddenError("Event does not belong to provider.");
  }
  if (event.authorization != "Pending") {
    if (event.authorization == "Accepted") throw new BadRequestError("Cannot update event information because it has already been accepted.");
    if (event.authorization == "Rejected") throw new BadRequestError("Cannot update event information because it has already been rejected.");
  }
  return event;
};

const sendMessage = async (data, providerId) => {
  try {
    const event = await providerRepository.getEventByName(data.event);
    if (!event) {
      throw new EventNotFoundError("The event that you are trying to send a message does not exist.");
    }
    if (event.provider_id != providerId) {
      throw new ForbiddenError("Event does not belong to provider.");
    }
    const dataToSend = {
      message: data.message,
      receivers: event.receivers,
      event_name: event.name
    }
    eventDataQueue.add(dataToSend);
    await providerRepository.updateMessageSentCount(event, true);
  } catch (error) {
    logger.error("Failed to send message.", { message: error.message, status: error.status, userType: 'Provider' });
    throw new EventError(error.status, error.message);
  }
};

const getProviderEvents = async (providerId) => {
  try {
    const events = await providerRepository.getProviderEvents(providerId)
    const authorizedEvents = events.filter(event => event.authorization == "Accepted");
    const unauthorizedEvents = events.filter(event => event.authorization == "Declined");

    return {
      events: events,
      authorizedCount: authorizedEvents.length,
      unauthorizedCount: unauthorizedEvents.length
    };
  } catch (error) {
    throw new EventError(error.status, error.message);
  }
};

const getProviderEvent = async (providerId, eventName) => {
  try {
    const event = await providerRepository.getProviderEvent(eventName);
    if (!event[0]) {
      throw new EventNotFoundError("The event that you are trying to get does not exist.");
    }
    if (event[0].provider_id.toString() !== providerId) {
      throw new ForbiddenError("Event does not belong to provider.");
    }
    event[0].provider_id = undefined;
    return event;
  } catch (error) {
    throw new EventError(error.status, error.message);
  }
};


const logIn = async (email, password) => {
  try {
    if (!email || !password) {
      throw new BadRequestError("Email and password are required.");
    }
    if (!validator.isEmail(email)) {
      throw new BadRequestError("Email is not valid.");
    }

    const user = await providerRepository.getUserByEmail(email);
    const validPass = user && await bcrypt.compare(password, user.password);

    if (!validPass) {
      logger.info(`Unauthorized access to the system by user with email '${email}'.`);
      throw new BadRequestError("Email or password are incorrect.");
    }

    const tokenData = {
      user_id: user._id.toString(),
      auth_client_id: "provider",
    };
    const response = await fetch(configStruct.auth_service.generate_address, {
      method: 'POST',
      body: JSON.stringify(tokenData),
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await response.json();

    logger.info(`Authorized access to the system by user with email '${email}'.`, { userType: 'Provider' });

    return data;
  }
  catch (error) {
    logger.error("Failed to login.", { message: error.message, status: error.status, userType: 'Provider' });
    throw new EventError(error.status, error.message);
  }
};

const logOut = async (req) => {
  try {
    const token = req.cookies.authorization;
    if (!token) {
      throw new InvalidTokenError("No token recieved.");
    }
  } catch (error) {
    logger.error("Failed to logout.", { message: error.message, status: error.status, userType: 'Provider' });
    throw new ErrorEvent(error.status, error.message);
  }
};

const deleteDirectoryAndFiles = (files) => {
  try {
    var directory;
    if (!files) return;
    if (files.mainImage) fs.unlinkSync(files.mainImage[0].path), directory = files.mainImage[0].destination;
    if (files.previewImage) fs.unlinkSync(files.previewImage[0].path), directory = files.previewImage[0].destination;
    if (fs.readdirSync(directory) == 0) fs.rmdirSync(directory);
  } catch (error) {
    throw new Error("Unknown error while deleting files.");
  }
};

const addFilesInfo = (event, files) => {
  try {
    event.mainImage = files.mainImage[0].filename;
    event.previewImage = files.previewImage[0].filename;
    event.filesRoute = files.mainImage[0].destination;
    return event;
  } catch (error) {
    throw new Error("Unknown error while adding files.");
  }
};

const validateInputInfo = async (eventData) => {
  try {
    const { name, description, startDate, endDate, previewImage, mainImage, category } = eventData;
    if (!name && !description && !startDate && !endDate && !previewImage && !mainImage && !category) {
      throw new BadRequestError("No data to update.");
    }
    const event = await providerRepository.getEventByName(name);
    if (event) {
      throw new BadRequestError("Event name already exists.");
    }
  } catch (error) {
    throw new EventError(error.status, error.message);
  }
};

const updateEventInputInfo = (event, eventData) => {
  const { name, description, startDate, endDate, category } = eventData;
  if (name) event.name = name;
  if (description) event.description = description;
  if (startDate) event.startDate = startDate;
  if (endDate) event.endDate = endDate;
  if (category) event.category = category;
  return event;
};

const validateEvent = async (event, files) => {
  try {
    await validateEventName(event.name);
    validateEventFields(event, files);
    const validatedEvent = await eventAuthorization(event, "create");
    return validatedEvent;
  } catch (error) {
    throw new EventError(error.status, error.message);
  }
};

const validateEventName = async (name) => {
  try {
    if (!name) {
      throw new BadRequestError("Event name is required.");
    }
    if (name.length < 3) {
      throw new BadRequestError("Event name must be at least 3 characters long.");
    }
    if (name.length > 50) {
      throw new BadRequestError("Event name must be at most 50 characters long.");
    }
    const event = await providerRepository.getEventByName(name);
    if (event) {
      throw new BadRequestError("Event name already exists.");
    }
  } catch (error) {
    throw new EventError(error.status, error.message);
  }
};

const validateEventFields = (event, files) => {
  const { name, description, startDate, endDate, category } = event;
  if (!name || !description || !startDate || !endDate || !category) {
    throw new BadRequestError("There are missing fields. Please fill all fields.");
  }
  if (!files.mainImage || !files.previewImage || !files) {
    throw new BadRequestError("There are missing files. Please upload all files.");
  }
  try {
    var startDateTime = new Date(startDate).toISOString();
    var endDateTime = new Date(endDate).toISOString();
  } catch (error) {
    throw new BadRequestError("Invalid start or end date. Please provide valid dates.");
  }
  if (isNaN(new Date(startDateTime)) || isNaN(new Date(endDateTime))) {
    throw new BadRequestError("Invalid start or end date. Please provide valid dates.");
  }
};

const eventAuthorization = async (event, mode) => {
  try {
    const validationMode = await getValidationMode();
    event.validations = [];
    const validatedEvent = await EventValidationPipeline.run(event);

    runValidations(validatedEvent.validations, mode);
    const paymentValid = isValidPayment(validatedEvent.validations);

    if (validationMode.mode == "automatic") {
      if (paymentValid) {
        validatedEvent.authorization = 'Accepted';
        validatedEvent.authorizationMode = 'automatic';
      } else {
        throw new EventValidationError("Could not " + mode + " event. Payment validation failed.");
      }
    } else {
      validatedEvent.authorization = 'Pending';
      validatedEvent.authorizationMode = 'manual';
    }
    return validatedEvent;
  } catch (error) {
    throw new EventError(error.status, error.message);
  }
};

const getValidationMode = async () => {
  try {
    const validationMode = await providerRepository.getValidationMode();
    return validationMode;
  } catch (error) {
    throw new EventError(error.status, error.message);
  }
};

const isValidPayment = (validations) => {
  for (let validation of validations) {
    if (validation.type == 'Payment Gateway' && !validation.passed) {
      return false;
    }
  }
  return true;
};

const runValidations = (validations, mode) => {
  try {
    for (let validation of validations) {
      if (validation.type != 'Payment Gateway' && !validation.passed) {
        throw new EventValidationError("Could not " + mode + " event. " + validation.type + " validation failed.");
      }
    }
  } catch (error) {
    throw new EventError(error.status, error.message);
  }
};

module.exports = {
  createEvent,
  updateEventInfo,
  updateEventFiles,
  sendMessage,
  getProviderEvents,
  getProviderEvent,
  logIn,
  logOut,
}
