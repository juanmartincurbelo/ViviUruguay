const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rating: {
        type: String,
    },
    comment: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        index: true,
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;