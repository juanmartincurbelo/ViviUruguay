const Purchase = require('../models/purchase')
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const createPurchase = async (purchase, receiveMails) => {
  try {
    const db = mongoose.connection;
    const Event = db.collection('events');
    let event = await Event.findOne({ name: purchase.event_name });

    if (!event) {
      throw new Error("Event not found");
    }

    if (receiveMails) {
      event.receivers.push(purchase.email);
    }

    event.subscribedClients++;
    event.averagePurchaseTime = (event.averagePurchaseTime * (event.subscribedClients - 1) + purchase.timestamp_difference) / event.subscribedClients;

    await Event.updateOne({ _id: event._id }, { $set: event });
    const newPurchase = new Purchase(purchase);
    const savedPurchase = await newPurchase.save();

    return savedPurchase;
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to create purchase: ${error.message}`);
  }
};

const getClient = async (client_id) => {
  try {
    const db = mongoose.connection;
    const Client = db.collection('clients');
    const client = await Client.findOne({ _id: new ObjectId(client_id) });

    return client;
  } catch (error) {
    throw new Error(`Failed to get client: ${error.message}`);
  }
};

module.exports = {
  createPurchase,
  getClient,
};
