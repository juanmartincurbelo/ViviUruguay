const validator = require("validator");
const bcrypt = require('bcrypt');
const fetch = require("node-fetch");
const fs = require('fs');
const path = require('path');

const adminRepository = require("../repositories/admin_repository");
const { AdminError, MissingFieldsError, InvalidEmailError, RegisteredEmailError,
  InvalidCredentialsError, InvalidTokenError, InvalidInputError, EventNotFoundError,
  BadRequestError, DatesError } = require("../errors/admin_errors");
const config = require("../config/config");
const logger = require("../../../utils/logger");

const configStruct = config.getConfig();

var Queue = require('bull')
var authorization_queue = new Queue(
  configStruct.redis.authorization_queue,
  `redis://${configStruct.redis.host}:${configStruct.redis.port}`,
);

var deauthorization_queue = new Queue(
  configStruct.redis.deauthorization_queue,
  `redis://${configStruct.redis.host}:${configStruct.redis.port}`,
);

const registerAdmin = async (adminData) => {
  try {
    validateAdminData(adminData);
    validateEmail(adminData.email)
    await validateRegisteredEmail(adminData.email, 'admin');

    adminData.password = await encryptPassword(adminData.password);

    const savedAdmin = await adminRepository.registerAdmin(adminData);

    return savedAdmin;
  } catch (error) {
    logger.error("Failed to register an Admin.", { message: error.message, status: error.status, userType: 'Admin' });
    throw new AdminError(error.message, error.status);
  }
}

const registerProvider = async (providerData) => {
  try {
    validateProviderData(providerData);
    validateEmail(providerData.email)
    await validateRegisteredEmail(providerData.email, 'provider');

    providerData.password = await encryptPassword(providerData.password);

    const savedProvider = await adminRepository.registerProvider(providerData);

    return savedProvider;
  } catch (error) {
    logger.error("Failed to register a Provider.", { message: error.message, status: error.status, userType: 'Admin' });
    throw new AdminError(error.message, error.status);
  }
}

const getActiveEvents = async () => {
  try {
    const events = await adminRepository.getActiveEvents();
    const eventCount = events.length;
    return { eventCount, events };
  } catch (error) {
    logger.error("Failed to get active events.", { message: error.message, status: error.status, userType: 'Admin' });
    throw new AdminError(error.message, error.status);
  }
}

const getEvents = async (startDate, endDate) => {
  try {
    const events = await adminRepository.getEvents(startDate, endDate);

    const approvedEventsFilter = events.filter(event => event.authorization == "Accepted");
    const approvedEventsAutomatic = approvedEventsFilter.filter(event => event.authorizationMode === "automatic");
    const approvedEventsManual = approvedEventsFilter.filter(event => event.authorizationMode === "manual");
    const rejectedEventsFilter = events.filter(event => event.authorization == "Declined");
    const totalEvents = events.length;

    let subscribedUsersCount = 0;
    events.forEach(event => {
      subscribedUsersCount += event.subscribedClients;
    });

    const approvedEventsAutomaticData = approvedEventsAutomatic.map(event => ({
      name: event.name,
      description: event.description,
      category: event.category,
      startDate: event.startDate,
      endDate: event.endDate,
      price: event.price,
      subscribedClients: event.subscribedClients,
    }));

    const approvedEventsManualData = approvedEventsManual.map(event => ({
      name: event.name,
      description: event.description,
      category: event.category,
      startDate: event.startDate,
      endDate: event.endDate,
      price: event.price,
      subscribedClients: event.subscribedClients,
    }));

    const rejectedEvents = rejectedEventsFilter.map(event => ({
      name: event.name,
      description: event.description,
      category: event.category,
      startDate: event.startDate,
      endDate: event.endDate,
      price: event.price,
      subscribedClients: event.subscribedClients,
    }));

    const approvedAutomaticCount = approvedEventsAutomatic.length;
    const approvedManualCount = approvedEventsManual.length;
    const rejectedCount = rejectedEvents.length;
    const pendingCount = totalEvents - approvedAutomaticCount - approvedManualCount - rejectedCount;
    const approvedCount = { automaticCount: approvedAutomaticCount, manualCount: approvedManualCount }

    const approvedEvents = { automatic: approvedEventsAutomaticData, manual: approvedEventsManualData };

    return {
      approvedEvents,
      rejectedEvents,
      totalEvents,
      approvedCount,
      pendingCount,
      rejectedCount,
      subscribedUsersCount
    };
  } catch (error) {
    logger.error("Failed to get events.", { message: error.message, status: error.status, userType: 'Admin' });
    throw new AdminError(error.message, error.status);
  }
}

const login = async ({ email, password }) => {
  try {
    validateLoginData(email, password);
    validateEmail(email);
    const admin = await adminRepository.emailExists(email, 'admin');
    const validPassword = admin && await bcrypt.compare(password, admin.password);

    if (!validPassword) {
      logger.info(`Unauthorized access to the system by user with email '${email}'.`);
      throw new InvalidCredentialsError();
    }

    const tokenData = {
      user_id: admin._id.toString(),
      auth_client_id: "admin",
    };
    const response = await fetch(configStruct.auth_service.generate_address, {
      method: 'POST',
      body: JSON.stringify(tokenData),
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await response.json();

    logger.info(`Authorized access to the system by user with email '${email}'.`, { userType: 'Admin' });

    return data;
  } catch (error) {
    logger.error("Failed to login.", { message: error.message, status: error.status, userType: 'Admin' });
    throw new AdminError(error.message, error.status);
  }
};

const logout = async (req) => {
  try {
    const token = req.cookies.authorization;

    if (!token) {
      throw new InvalidTokenError("No token received.");
    }
  } catch (error) {
    logger.error("Failed to logout.", { message: error.message, status: error.status, userType: 'Admin' });
    throw new AdminError(error.message, error.status);
  }
};

const updateAuthorizationMode = async (newMode) => {
  try {
    validateMode(newMode.mode);
    const updatedMode = await adminRepository.updateAuthorizationMode(newMode);
    return updatedMode;
  } catch (error) {
    logger.error("Failed to update the authorization mode of an event.", { message: error.message, status: error.status, userType: 'Admin' });
    throw new AdminError(error.message, error.status);
  }
};

const authorizeEvent = async (data, user_id) => {
  try {
    validateData(data);
    const { providerName, eventName } = data;

    const event = await adminRepository.getEvent(eventName);
    if (!event) {
      throw new EventNotFoundError("Event not found.");
    }

    const provider = await adminRepository.getProvider(event.provider_id);
    if (providerName != provider.name) {
      throw new EventNotFoundError("There is no event with that name for that provider.");
    }

    if (event.authorization == 'Accepted') {
      throw new BadRequestError("Event already authorized.");
    }
    if (event.authorization == 'Declined') {
      throw new BadRequestError("Event was previously declined and cannot be authorized.");
    }

    await adminRepository.authorizeEvent(eventName);

    const admin = await adminRepository.getAdmin(user_id);
    logger.event(`Event '${eventName}' authorized by ${admin.name}.`)

    const dataMail = {
      eventName: eventName,
      providerEmail: provider.email
    }
    authorization_queue.add(dataMail);
    return eventName;
  } catch (error) {
    logger.error("Failed to authorize event.", { message: error.message, status: error.status, userType: 'Admin' });
    throw new AdminError(error.message, error.status);
  }
};

const deauthorizeEvent = async (data, user_id) => {
  try {
    validateData(data);
    const { providerName, eventName, reason } = data;

    const event = await adminRepository.getEvent(eventName);
    if (!event) {
      throw new EventNotFoundError("Event not found.");
    }

    const provider = await adminRepository.getProvider(event.provider_id);
    if (providerName != provider.name) {
      throw new EventNotFoundError("There is no event with that name for that provider.");
    }

    if (event.authorization == 'Accepted') {
      throw new BadRequestError("Event was previously authorized and cannot be declined.");
    }
    if (event.authorization == 'Declined') {
      throw new BadRequestError("Event already declined.");
    }

    const admin = await adminRepository.getAdmin(user_id);
    await adminRepository.deauthorizeEvent(eventName);
    const dataInformation = {
      reason: reason,
      event: eventName,
      provider: provider.email,
      admin: admin.name
    }
    deauthorization_queue.add(dataInformation);

    logger.event(`Event '${eventName}' deauthorized by ${admin.name}.`)

    return eventName;
  } catch (error) {
    logger.error("Failed to deauthorize event.", { message: error.message, status: error.status, userType: 'Admin' });
    throw new AdminError(error.message, error.status);
  }
};

const getApplicationLogs = async (startDate, endDate) => {
  try {
    const startTimestamp = Date.parse(startDate);
    const endTimestamp = Date.parse(endDate);
    if (isNaN(startTimestamp) || isNaN(endTimestamp)) {
      throw new DatesError('Dates are invalid');
    }

    if (startTimestamp > endTimestamp) {
      throw new DatesError('End date must be greater than or equal to Start date');
    }

    const filePath = path.join(__dirname, configStruct.application_log.path);
    const file = await fs.promises.readFile(filePath, 'utf8');
    const lines = file.split('\n').filter(line => line !== '');
    const applicationLogs = lines
      .map(line => JSON.parse(line))
      .filter(log => {
        const logTimestamp = new Date(log.timestamp);
        return logTimestamp >= startDate && logTimestamp <= endDate;
      });

    return applicationLogs;
  } catch (error) {
    logger.error("Failed to get application logs.", { message: error.message, status: error.status, userType: 'Admin' });
    throw new AdminError(error.message, error.status);
  }
};

const validateData = (data) => {
  const { providerName, eventName } = data;
  if (!providerName || !eventName) {
    throw new MissingFieldsError();
  }
};

const validateMode = (mode) => {
  try {
    if (!mode) {
      throw new InvalidInputError("No mode received.");
    }
    if (mode != "manual" && mode != "automatic") {
      throw new InvalidInputError("Invalid mode received.");
    }
  } catch (error) {
    throw new AdminError(error.message, error.status);
  }
};

const validateAdminData = (adminData) => {
  const { name, email, password } = adminData;

  if (!name || !email || !password) {
    throw new MissingFieldsError();
  }
}

const validateProviderData = (providerData) => {
  const { name, email, password, country, city, currencyCode,
    currencyName, currencySymbol, defaultPrice } = providerData;

  if (!name || !email || !password || !country || !city ||
    !currencyCode || !currencyName || !currencySymbol || !defaultPrice) {
    throw new MissingFieldsError();
  }
}

const validateEmail = (email) => {
  if (!validator.isEmail(email)) {
    throw new InvalidEmailError();
  }
};

const validateRegisteredEmail = async (email, user) => {
  const existingEmail = await adminRepository.emailExists(email, user);

  if (existingEmail) {
    throw new RegisteredEmailError();
  }
};

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  return encryptedPassword;
};

const validateLoginData = (email, password) => {
  if (!email || !password) {
    throw new MissingFieldsError();
  }
};

module.exports = {
  registerAdmin,
  registerProvider,
  getActiveEvents,
  login,
  logout,
  updateAuthorizationMode,
  authorizeEvent,
  deauthorizeEvent,
  getApplicationLogs,
  getEvents
};
