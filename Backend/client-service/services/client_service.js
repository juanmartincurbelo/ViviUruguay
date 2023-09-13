const bcrypt = require('bcrypt');
const validator = require("validator");
const fetch = require("node-fetch");
const path = require("path");
var Queue = require('bull')

const clientRepository = require("../repositories/client_repository");
const { ClientError, MissingFieldsError, InvalidEmailError, RegisteredEmailError,
  InvalidCredentialsLogInError, InvalidTokenError, EventNotFoundError,
  ClientNotFoundError, BadRequestError } = require("../errors/errors.js");
const Purchase = require("../models/purchase");
const config = require("../config/config");
const configStruct = config.getConfig();
const logger = require('../../utils/logger');

var pendingPurchasesQueue = new Queue(
  configStruct.redis.pending_purchases_queue,
  `redis://${configStruct.redis.host}:${configStruct.redis.port}`,
)

const registerClient = async (req) => {
  try {
    const { email, password, fullName, dateOfBirth, countryOfOrigin } = req.body;


    if (!email || !password || !fullName || !dateOfBirth || !countryOfOrigin) {
      throw new MissingFieldsError();
    }

    if (!validator.isEmail(email)) {
      throw new InvalidEmailError();
    }

    const existingClient = await clientRepository.emailExists(email);
    if (existingClient) {
      throw new RegisteredEmailError();
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const createdClient = await clientRepository.createClient(newClient);

    return createdClient;
  } catch (error) {
    logger.error("Failed to register a Client.", { message: error.message, status: error.status, userType: 'Client' });
    throw new ClientError(error.message, error.status);
  }
}

const logIn = async (req) => {
  try {
    if (!req.body.email || !req.body.password) {
      throw new MissingFieldsError();
    }

    if (!validator.isEmail(req.body.email)) {
      throw new InvalidEmailError();
    }

    const existingClient = await clientRepository.emailExists(req.body.email);
    const validPass = existingClient && await bcrypt.compare(req.body.password, existingClient.password);

    if (!validPass) {
      logger.info(`Unauthorized access to the system by user with email '${req.body.email}'.`);
      throw new InvalidCredentialsLogInError();
    }

    const tokenData = {
      user_id: existingClient._id.toString(),
      auth_client_id: "client",
    };

    const response = await fetch(configStruct.auth_service.generate_address, {
      method: 'POST',
      body: JSON.stringify(tokenData),
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await response.json();

    logger.info(`Authorized access to the system by user with email '${req.body.email}'.`, { userType: 'Client' });

    return data;
  } catch (error) {
    logger.error("Failed to login.", { message: error.message, status: error.status, userType: 'Client' });
    throw new ClientError(error.message, error.status);
  }
}

const logout = async (req) => {
  try {
    const token = req.cookies.authorization;

    if (!token) {
      throw new InvalidTokenError();
    }
  } catch (error) {
    logger.error("Failed to logout.", { message: error.message, status: error.status, userType: 'Client' });
    throw new ClientError(error.message, error.status);
  }
};

const getAuthorizedEvents = async () => {
  try {
    const events = await clientRepository.getAuthorizedEvents();
    return events;
  } catch (error) {
    logger.error("Failed to get authorized events.", { message: error.message, status: error.status, userType: 'Client' });
    throw new ClientError(error.message, error.status);
  }
}

const getEvents = async (userId) => {
  try {
    const events = await clientRepository.getEvents(userId);
    return events;
  } catch (error) {
    logger.error("Failed to get events.", { message: error.message, status: error.status, userType: 'Client' });
    throw new ClientError(error.message, error.status);
  }
}

const purchaseEvent = async (req) => {
  try {
    const data = req.body;
    validateData(data);
    const { eventName, providerName, phone, name, email, receiveMails } = data;

    const event = await clientRepository.getEventByName(eventName);
    if (!event || event.authorization != "Accepted") {
      throw new EventNotFoundError("Event not found. Please check the information provided.");
    }

    const provider = await clientRepository.getProviderById(event.provider_id);
    if (providerName != provider.name) {
      throw new EventNotFoundError("There is no event with that name for that provider.");
    }

    // const client = await clientRepository.getClientById(req.user.user_id);
    // if (!client) {
    //   throw new ClientNotFoundError("Client not found.");
    // };

    const newPurchase = new Purchase({
      event_name: event.name,
      provider_id: provider._id,
      phone: phone,
      name: name,
      email: email,
      timestamp_sent: new Date(),
    });

    await pendingPurchasesQueue.add({ purchase: newPurchase, receiveMails: receiveMails });
  } catch (error) {
    logger.error("Failed to purchase event.", { message: error.message, status: error.status, userType: 'Client' });
    throw new ClientError(error.message, error.status);
  }
}

const getVideo = async (req) => {
  try {
    const eventName = req.params.eventName;
    const event = await clientRepository.getEventByName(eventName);
    if (!event) {
      throw new EventNotFoundError("The url is not valid.");
    }

    const purchase = await clientRepository.getPurchase(event.name, req.user.user_id);
    if (!purchase) {
      throw new ClientError("It seems that you haven't purchased the event yet. If you'd like to gain access, please proceed with the purchase.", 403);
    }

    if (event.startDate > new Date()) {
      throw new ClientError("We would like to inform you that the event has not started yet.", 400);
    }

    if (event.endDate < new Date()) {
      throw new ClientError("We would like to inform you that the event has already ended.", 400);
    }
    const url = path.join(event.filesRoute, event.video);
    return url;
  } catch (error) {
    logger.error("Failed to get video.", { message: error.message, status: error.status, userType: 'Client' });
    throw new ClientError(error.message, error.status);
  }
}

const updateMaxConcurrentClientsAndAverageWaitTime = async (req, timestamp_sent, timestamp_answer) => {
  try {
    const eventName = req.params.eventName;
    await clientRepository.updateMaxConcurrentClientsAndAverageWaitTime(eventName, timestamp_sent, timestamp_answer);
  } catch (error) {
    throw new ClientError(error.message, error.status);
  }
}

const validateData = (data) => {
  const { eventName, providerName, receiveMails } = data;
  if (!eventName || !providerName || receiveMails === undefined) {
    throw new BadRequestError('Missing required information to purchase event');
  }
  if (!(typeof receiveMails === 'boolean')) {
    throw new BadRequestError('Invalid receiveMails value. Must take values true or false.');
  }
};

module.exports = {
  registerClient,
  getAuthorizedEvents,
  getEvents,
  logIn,
  logout,
  purchaseEvent,
  getVideo,
  updateMaxConcurrentClientsAndAverageWaitTime,
}
