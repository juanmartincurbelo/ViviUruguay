const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    provider_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider',
        required: true
    },
    event_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    timestamp_sent: {
        type: Date,
        trim: true,
    },
    timestamp_answer: {
        type: Date,
        trim: true,
    },
    timestamp_difference: {
        type: Date,
        trim: true,
    },
});

//

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
