const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: Number,
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        index: true,
    }
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
