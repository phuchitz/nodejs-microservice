const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    rating: { type: Number, required: true },
    comment: { type: String }
});

module.exports = mongoose.model('Review', ReviewSchema);