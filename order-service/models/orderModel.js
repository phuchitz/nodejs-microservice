const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    products: [{ productId: mongoose.Schema.Types.ObjectId, quantity: Number }],
    total: { type: Number, required: true },
    status: { type: String, default: 'pending' }
});

module.exports = mongoose.model('Order', OrderSchema);