const adminService = require('../services/admin_service');

const registerAdmin = async (req, res) => {
  try {
    const admin = await adminService.registerAdmin(req.body);
    res.status(200).json(`${admin.name} registered successfully`);
  } catch (error) {
    res.status(error.status).json(error.message);
  }
}

const registerProvider = async (req, res) => {
  try {
    const provider = await adminService.registerProvider(req.body);
    res.status(200).json(`${provider.name} registered successfully`);
  } catch (error) {
    res.status(error.status).json(error.message);
  }
}

const login = async (req, res) => {
  try {
    const token = await adminService.login(req.body);
    res.status(200).cookie("authorization", token).json({ message: 'Logged in' });
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};

const logout = async (req, res) => {
  try {
    await adminService.logout(req);
    res.clearCookie("authorization").status(200).json({ message: 'Logged out' });
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};

const updateAuthorizationMode = async (req, res) => {
  try {
    const data = req.body;
    const updatedMode = await adminService.updateAuthorizationMode(data);
    res.status(200).json("Authorization mode updated successfully to " + updatedMode);
  } catch (error) {
    res.status(error.status).json(error.message);
  }
}

const authorizeEvent = async (req, res) => {
  try {
    const data = req.body;
    const user_id = req.user.user_id;
    const eventName = await adminService.authorizeEvent(data, user_id);
    res.status(200).json("Event " + eventName + " authorized successfully.");
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};

const deauthorizeEvent = async (req, res) => {
  try {
    const data = req.body;
    const user_id = req.user.user_id;
    const eventName = await adminService.deauthorizeEvent(data, user_id);
    res.status(200).json("Event " + eventName + " deauthorized successfully.");
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};

const getApplicationLogs = async (req, res) => {
  try {
    const startDate = new Date(req.params.startDate);
    const endDate = new Date(req.params.endDate);
    const applicationLogs = await adminService.getApplicationLogs(startDate, endDate);
    const status = applicationLogs.length > 0 ? 200 : 204;
    const message = applicationLogs.length > 0 ? applicationLogs : "No activity during this period of time.";
    res.status(status).json(message);
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};

const getActiveEvents = async (req, res) => {
  try {
    const events = await adminService.getActiveEvents();
    res.status(200).json(events);
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await adminService.getEvents(req.params.startDate, req.params.endDate);
    res.status(200).json(events);
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};

module.exports = {
  registerAdmin,
  registerProvider,
  login,
  logout,
  updateAuthorizationMode,
  authorizeEvent,
  deauthorizeEvent,
  getApplicationLogs,
  getActiveEvents,
  getEvents,
};
