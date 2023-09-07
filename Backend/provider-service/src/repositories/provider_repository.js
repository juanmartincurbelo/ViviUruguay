const { EventValidationPipeline } = require('../Pipes&Filters/Pipes/EventValidatorPipeline');
const { EventNotFoundError, InvalidIdError, InvalidEventError } = require('../errors/providers_errors');
const Event = require('../models/event');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const createEvent = async (eventData, defaultPrice) => {
  try {
    const newEvent = new Event({ ...eventData, price: defaultPrice });
    const savedEvent = await newEvent.save();
    return savedEvent;
  } catch (error) {
    console.log(error.message);
    throw new Error('Unknown error at creating event.');
  }
};

const updateEvent = async (eventName, updatedEvent) => {
  try {
    const savedEvent = await Event.findOneAndUpdate({ name: eventName }, updatedEvent, { new: true });
    return savedEvent;
  }
  catch (error) {
    throw new Error('Unknown error at updating event.');
  }
};

const getUserByEmail = async (email) => {
  try {
    const db = mongoose.connection;
    const Provider = db.collection('providers');
    const user = await Provider.findOne({ email: email });
    return user;
  } catch (error) {
    throw new Error('Unknown error at getting user by email');
  }
};

const getEventByName = async (name) => {
  try {
    const event = await Event.findOne({ name: name });
    return event;
  } catch (error) {
    throw new Error('Unknown error at getting event by name');
  }
};

const getValidationMode = async () => {
  try {
    const db = mongoose.connection;
    const Mode = db.collection('modes');
    const mode = await Mode.findOne();
    return mode;
  } catch (error) {
    throw new Error('Unknown error at getting validation mode.');
  }
};

const getAdmins = async () => {
  try {
    const db = mongoose.connection;
    const Admin = db.collection('admins');
    const admins = await Admin.find();
    return admins;
  } catch (error) {
    throw new Error(`Failed to get admins: ${error.message}`);
  }
};

const getPendingAuthorizationEvents = async (setHoursToSendEmail) => {
  try {
    const currentDate = new Date();

    const targetDate = new Date(currentDate.getTime() + setHoursToSendEmail * 60 * 60 * 1000);
    targetDate.setMinutes(59);
    targetDate.setSeconds(59);

    const lowerBoundDate = new Date(currentDate.getTime() + setHoursToSendEmail * 60 * 60 * 1000);
    lowerBoundDate.setMinutes(0);
    lowerBoundDate.setSeconds(0);

    const pendingEvents = await Event.find({
      authorization: "Pending",
      startDate: {
        $gte: lowerBoundDate,
        $lt: targetDate
      }
    });

    return pendingEvents;
  } catch (error) {
    throw new Error(`Failed to get events: ${error.message}`);
  }
}

const getProvider = async (provider_id) => {
  try {
    const db = mongoose.connection;
    const Provider = db.collection('providers');
    const provider = await Provider.findOne({ _id: new ObjectId(provider_id) });

    return provider;
  } catch (error) {
    throw new Error(`Failed to get provider: ${error.message}`);
  }
};

const getProviderEvents = async (provider_id) => {
  try {
    const events = await Event.find({ provider_id: new ObjectId(provider_id) }).select(
      "name subscribedClients averagePurchaseTime maxConcurrentClients averageWaitTime sentMessages failedMessages authorization -_id"
    );

    return events;
  } catch (error) {
    throw new Error(`Failed to get events: ${error.message}`);
  }
};

const getProviderEvent = async (eventName) => {
  try {
    const event = await Event.find({ name: eventName }).select(
      "name subscribedClients averagePurchaseTime maxConcurrentClients averageWaitTime sentMessages failedMessages provider_id -_id"
    );

    return event;
  } catch (error) {
    throw new Error(`Failed to get event: ${error.message}`);
  }
};

const updateMessageSentCount = async (event, isOk) => {
  try {
    if (isOk) {
      event.sentMessages++
    } else {
      event.failedMessages++
    };
    await event.save();
  } catch (error) {
    throw new Error(`Failed to update message sent count: ${error.message}`);
  }
}

module.exports = {
  createEvent,
  updateEvent,
  getUserByEmail,
  getValidationMode,
  getEventByName,
  getAdmins,
  getPendingAuthorizationEvents,
  getProvider,
  getProviderEvents,
  getProviderEvent,
  updateMessageSentCount,
};
