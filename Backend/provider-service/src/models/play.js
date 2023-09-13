const mongoose = require('mongoose');

const playSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value > Date.now();
            },
            message: 'Date must be greater than the current date.'
        }
    },
    ticketsAvailable: {
        type: Number,
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        index: true,
    }
});

const Play = mongoose.model('Play', playSchema);

module.exports = Play;
