const mongoose = require('mongoose');

const Mode = require('../models/authorizationMode');

const registerAdmin = async (adminData) => {
  try {
    const newAdmin = new Admin(adminData);
    const savedAdmin = await newAdmin.save();

    return savedAdmin;
  } catch (error) {
    throw new Error(`Failed to register admin: ${error.message}`);
  }
}

const registerProvider = async (providerData) => {
  try {
    const newProvider = new Provider(providerData);
    const savedProvider = await newProvider.save();

    return savedProvider;
  } catch (error) {
    throw new Error(`Failed to register provider: ${error.message}`);
  }
};

const emailExists = async (email, user) => {
  try {
    const existingEmail = user === 'admin' ?
      await Admin.findOne({ email }) : await Provider.findOne({ email });

    return existingEmail;
  } catch (error) {
    throw new Error(`Failed to validate email registration: ${error.message}`);
  }
};

const updateAuthorizationMode = async (newMode) => {
  try {
    let mode = await Mode.findOne();
    if (!mode) {
      mode = new Mode({ mode: newMode.mode });
    } else {
      mode.mode = newMode.mode;
    }
    await mode.save();
    return mode.mode;
  } catch (error) {
    throw new Error(`Failed to update authorization mode: ${error.message}`);
  }
};

const getEvent = async (eventName) => {
  try {
    const db = mongoose.connection;
    const Event = db.collection('events');
    const event = await Event.findOne({ name: eventName });
    return event;
  } catch (error) {
    throw new Error(`Failed to get event: ${error.message}`);
  }
};

const getActiveEvents = async () => {
  try {
    const currentDate = new Date();
    const event = await Event.find({
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate }
    }).select(
      "name subscribedClients maxConcurrentClients averageWaitTime -_id"
    );
    return event;
  } catch (error) {
    throw new Error(`Failed to get active events: ${error.message}`);
  }
};

const getEvents = async (startDate, endDate) => {
  try {
    const events = await Event.find({
      startDate: { $gte: startDate, $lte: endDate }
    });
    return events;
  } catch (error) {
    throw new Error(`Failed to get events: ${error.message}`);
  }
};


const getProvider = async (provider_id) => {
  try {
    const db = mongoose.connection;
    const Provider = db.collection('providers');
    const provider = await Provider.findOne({ _id: provider_id });
    return provider;
  } catch (error) {
    throw new Error(`Failed to get provider: ${error.message}`);
  }
};

const getAdmin = async (admin_id) => {
  try {
    const admin = await Admin.findOne({ _id: admin_id });
    return admin;
  } catch (error) {
    throw new Error(`Failed to get admin: ${error.message}`);
  }
};

const authorizeEvent = async (eventName) => {
  try {
    const db = mongoose.connection;
    const Event = db.collection('events');
    await Event.findOneAndUpdate(
      { name: eventName },
      { $set: { authorization: 'Accepted' } }
    );
  } catch (error) {
    throw new Error(`Failed to authorize event: ${error.message}`);
  }
};

const deauthorizeEvent = async (eventName) => {
  try {
    const db = mongoose.connection;
    const Event = db.collection('events');
    await Event.findOneAndUpdate(
      { name: eventName },
      { $set: { authorization: 'Declined' } }
    );
  } catch (error) {
    throw new Error(`Failed to deauthorize event: ${error.message}`);
  }
};

module.exports = {
  registerAdmin,
  registerProvider,
  emailExists,
  updateAuthorizationMode,
  getEvent,
  getActiveEvents,
  getEvents,
  authorizeEvent,
  deauthorizeEvent,
  getProvider,
  getAdmin
};
