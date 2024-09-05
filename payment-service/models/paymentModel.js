const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, required: true },
    amount: { type: Number, required: true },
    method: { type: String, required: true },
    status: { type: String, default: 'pending' }
});

module.exports = mongoose.model('Payment', PaymentSchema);