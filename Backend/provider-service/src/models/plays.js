const mongoose = require('mongoose');

const playsSchema = new mongoose.Schema({
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
    maxTickets: {
        type: Number,
    },
    minimum: {
        type: Number,
    },
});

const Plays = mongoose.model('Plays', playsSchema);

module.exports = Plays;
