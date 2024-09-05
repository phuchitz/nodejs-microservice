const Payment = require('../models/paymentModel');
const logger = require('../logger');

exports.processPayment = async (req, res) => {
    const { orderId, amount, method } = req.body;
    try {
        const payment = new Payment({ orderId, amount, method });
        await payment.save();
        logger.info(`Payment processed for order: ${orderId}`);
        res.status(201).send('Payment processed');
    } catch (error) {
        logger.error('Error processing payment:', error);
        res.status(500).send('Error processing payment');
    }
};

exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        logger.info('Fetched all payments');
        res.send(payments);
    } catch (error) {
        logger.error('Error fetching payments:', error);
        res.status(500).send('Error fetching payments');
    }
};

exports.getPaymentById = async (req, res) => {
    const { id } = req.params;
    try {
        const payment = await Payment.findById(id);
        if (!payment) {
            logger.warn(`Payment not found: ${id}`);
            return res.status(404).send('Payment not found');
        }
        logger.info(`Fetched payment: ${id}`);
        res.send(payment);
    } catch (error) {
        logger.error(`Error fetching payment: ${id}`, error);
        res.status(500).send('Error fetching payment');
    }
};

exports.updatePayment = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const payment = await Payment.findByIdAndUpdate(id, { status }, { new: true });
        if (!payment) {
            logger.warn(`Payment not found: ${id}`);
            return res.status(404).send('Payment not found');
        }
        logger.info(`Payment updated: ${id}`);
        res.send(payment);
    } catch (error) {
        logger.error(`Error updating payment: ${id}`, error);
        res.status(500).send('Error updating payment');
    }
};

exports.deletePayment = async (req, res) => {
    const { id } = req.params;
    try {
        const payment = await Payment.findByIdAndDelete(id);
        if (!payment) {
            logger.warn(`Payment not found: ${id}`);
            return res.status(404).send('Payment not found');
        }
        logger.info(`Payment deleted: ${id}`);
        res.send('Payment deleted');
    } catch (error) {
        logger.error(`Error deleting payment: ${id}`, error);
        res.status(500).send('Error deleting payment');
    }
};