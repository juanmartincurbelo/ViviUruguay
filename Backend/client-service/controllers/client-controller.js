const fs = require("fs");
const clientService = require("../services/client_service");

const registerClient = async (req, res) => {
  try {
    const client = await clientService.registerClient(req);
    res.status(201).json({ message: client.fullName + ' registered successfully' });
  } catch (error) {
    res.status(error.status).json(error.message);
  }
}

const logIn = async (req, res) => {
  try {
    const token = await clientService.logIn(req);
    res.status(200).cookie("authorization", token).json("Successfully logged in. Welcome!");
  } catch (error) {
    res.status(error.status).json(error.message);
  }
}

const logout = async (req, res) => {
  try {
    await clientService.logout(req);
    res.clearCookie("authorization").status(200).json("Successfully logged out. See you soon!");
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};

const getAuthorizedEvents = async (req, res) => {
  try {
    const events = await clientService.getAuthorizedEvents();
    const status = events.length > 0 ? 200 : 204;
    const message = events.length > 0 ? events : "There are no authorized events registered.";
    return res.status(status).json(message);
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await clientService.getEvents(req.user.user_id);
    return res.status(200).json(events);
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};

const purchaseEvent = async (req, res) => {
  try {
    await clientService.purchaseEvent(req, res);
    return res.status(200).json("Your purchase is currently being processed. We will send you an email notification once the purchase process is completed.");
  } catch (error) {
    res.status(error.status).json(error.message);
  }
}

module.exports = {
  registerClient,
  logIn,
  logout,
  getAuthorizedEvents,
  getEvents,
  purchaseEvent
};
