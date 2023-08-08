const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const Event = require('../models/event')
const Purchase = require('../models/purchase')

const emailExists = async (email) => {
  try {
    const db = mongoose.connection;
    const Client = db.collection('clients');
    const existingClient = await Client.findOne({ email });
    return existingClient;
  } catch (error) {
    throw new Error(`Failed to validate email registration: ${error.message}`);
  }
};

const createClient = async (newClient) => {
  try {
    const db = mongoose.connection;
    const Client = db.collection('clients');
    const createdClient = await Client.create(newClient);
    return createdClient;
  } catch (error) {
    throw new Error(`Failed to create client: ${error.message}`);
  }
};

const getAuthorizedEvents = async () => {
  try {
    const events = await Event.find({ authorization: "Accepted", endDate: { $gte: new Date() } })
      .select('name description price startDate endDate category previewImage -_id');

    return events;
  } catch (error) {
    throw new Error('Error while retrieving the list of authorized events.');
  };
};

// const getEvents = async (userId) => {
//   try {
//     const currentDate = new Date();
//     const subscribedEvents = await Purchase.find({ client_id: userId }).distinct('event_name');
//     const events = await Event.find({
//       $or: [
//         { endDate: { $gte: currentDate }, authorization: "Accepted" },
//         { name: { $in: subscribedEvents } }
//       ]
//     }).select(
//       "name description category startDate endDate price subscribedClients -_id"
//     );

//     return events;
//   } catch (error) {
//     throw new Error('Error while retrieving the list of events.');
//   };
// };

const getProviderById = async (provider_id) => {
  try {
    const db = mongoose.connection;
    const Provider = db.collection('providers');
    const provider = await Provider.findOne({ _id: provider_id });
    return provider;
  } catch (error) {
    throw new Error(`Failed to get provider: ${error.message}`);
  }
};

const getClientById = async (clientId) => {
  try {
    const db = mongoose.connection;
    const Client = db.collection('clients');
    const client = await Client.findById(clientId);
    return client;
  } catch (error) {
    throw new Error(`Failed to get client: ${error.message}`);
  }
};

const getEventByName = async (eventName) => {
  try {
    const db = mongoose.connection;
    const Event = db.collection('events');
    const event = await Event.findOne({ name: eventName });
    return event;
  } catch (error) {
    throw new Error('Unknown error while retrieving the video. Please try again later.');
  }
}

const getPurchase = async (eventName, clientId) => {
  try {
    const db = mongoose.connection;
    const Purchase = db.collection('purchases');
    const purchase = await Purchase.findOne({ client_id: new ObjectId(clientId), event_name: eventName });
    return purchase;
  } catch (error) {
    throw new Error(`Failed to get purchase: ${error.message}`);
  }
};

const updateMaxConcurrentClientsAndAverageWaitTime = async (eventName, timestamp_sent, timestamp_answer) => {
  try {
    const db = mongoose.connection;
    const Event = db.collection('events');
    const event = await Event.findOne({ name: eventName });
    event.maxConcurrentClients++;
    event.averageWaitTime = (event.averageWaitTime * (event.maxConcurrentClients - 1) + ((timestamp_answer - timestamp_sent) / 1000)) / event.maxConcurrentClients;
    await event.save();
  } catch (error) {
    throw new Error(`Failed to update max concurrent clients: ${error.message}`);
  }
}

module.exports = {
  getAuthorizedEvents,
  // getEvents,
  emailExists,
  createClient,
  getProviderById,
  getClientById,
  getEventByName,
  getPurchase,
  updateMaxConcurrentClientsAndAverageWaitTime,
};
