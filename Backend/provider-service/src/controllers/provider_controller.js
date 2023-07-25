const providerService = require("../services/provider_service");
require("../services/check-authorized-service");

const createEvent = async (req, res) => {
  try {
    const eventData = JSON.parse(req.body.jsonData);
    const files = req.files;
    eventData.provider_id = req.user.user_id;

    const createdEvent = await providerService.createEvent(eventData, files);
    res.status(200).json(createdEvent);
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json(error.message);
  }
};

const updateEventInfo = async (req, res) => {
  try {
    const eventData = req.body;
    const eventName = req.query.eventName;
    const providerId = req.user.user_id;

    const updatedEvent = await providerService.updateEventInfo(eventName, providerId, eventData);
    res.status(200).json(updatedEvent);
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json(error.message);
  }
};

const updateEventFiles = async (req, res) => {
  try {
    const files = req.files;
    const eventName = req.query.eventName;
    const providerId = req.user.user_id;

    const updatedEvent = await providerService.updateEventFiles(eventName, providerId, files);
    res.status(200).json(updatedEvent);
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json(error.message);
  }
};

const sendMessage = async (req, res) => {
  try {
    const data = req.body;
    const providerId = req.user.user_id;
    await providerService.sendMessage(data, providerId);
    res.status(200).json("Message sending request received successfully.");
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json(error.message);
  }
};

const getProviderEvents = async (req, res) => {
  try {
    const events = await providerService.getProviderEvents(req.user.user_id);
    res.status(200).json(events);
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json(error.message);
  }
}

const getProviderEvent = async (req, res) => {
  try {
    const event = await providerService.getProviderEvent(req.user.user_id, req.body.eventName);
    res.status(200).json(event);
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json(error.message);
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await providerService.logIn(email, password);
    res.status(200).cookie("authorization", token).json({ message: 'Logged in' });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json(error.message);
  }
};

const logout = async (req, res) => {
  try {
    await providerService.logOut(req);
    res.clearCookie("authorization").status(200).json({ message: 'Logged out' });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json(error.message);
  }
};


module.exports = {
  createEvent,
  updateEventInfo,
  updateEventFiles,
  sendMessage,
  getProviderEvents,
  getProviderEvent,
  login,
  logout
};
