const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  previewDescription: {
    type: String,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
  department: {
    type: String,
  },
  category: [{
    type: String,
  }],
  price: {
    type: Number,
  },
  currencySymbol: {
    type: String,
  },
  extras: [
    {
      name: String,
      price: Number,
    },
  ],
  soldTickets: {
    type: Number,
  },
  priority: {
    type: Number,
  },
  authorization: {
    type: String,
    enum: ['Accepted', 'Pending', 'Declined'],
  },
  image1: {
    type: String,
  },
  image2: {
    type: String,
  },
  image3: {
    type: String,
  },
  previewImage: {
    type: String,
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
