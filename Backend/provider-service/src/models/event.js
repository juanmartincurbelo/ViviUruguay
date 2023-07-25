const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value > this.startDate;
      },
      message: 'End date must be greater than the start date.'
    }
  },
  previewImage: {
    type: String,
    required: true
  },
  mainImage: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  authorization: {
    type: String,
    enum: ['Accepted', 'Pending', 'Declined'],
    required: true
  },
  provider_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'provider',
    required: true
  },
  receivers: {
    type: [String]
  },
  subscribedClients: {
    type: Number,
    default: 0
  },
  priority: {
    type: String,
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  maxTickets: {
    type: Number,
    default: 0
  },
  averagePurchaseTime: {
    type: Number,
    default: 0
  },
  maxConcurrentClients: {
    type: Number,
    default: 0
  },
  averageWaitTime: {
    type: Number,
    default: 0
  },
  sentMessages: {
    type: Number,
    default: 0
  },
  failedMessages: {
    type: Number,
    default: 0
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
