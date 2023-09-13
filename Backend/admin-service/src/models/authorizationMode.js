const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  mode: {
    type: String,
    enum: ['manual', 'automatic'],
    required: true
  }
});

const Mode = mongoose.model('Mode', providerSchema);

module.exports = Mode;