const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  previewDescription: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  currencySymbol: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  extras: [
    {
      name: String,
      price: String,
    },
  ],
  additionalInfo: {
    type: String,
  },
  soldTickets: {
    type: Number,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  authorization: {
    type: String,
    enum: ['Accepted', 'Pending', 'Declined'],
    required: true
  },
  image1: {
    type: String,
    required: true
  },
  image2: {
    type: String,
    required: true
  },
  image3: {
    type: String,
    required: true
  },
  previewImage: {
    type: String,
    required: true
  },
  plays: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plays',
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reviews',
    },
  ],
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
