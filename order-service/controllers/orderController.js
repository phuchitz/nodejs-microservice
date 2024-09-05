const Order = require('../models/orderModel');
const logger = require('../logger');

exports.createOrder = async (req, res) => {
    const { userId, products, total } = req.body;
    try {
        const order = new Order({ userId, products, total });
        await order.save();
        logger.info(`Order created for user: ${userId}`);
        res.status(201).send('Order created');
    } catch (error) {
        logger.error('Error creating order:', error);
        res.status(500).send('Error creating order');
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        logger.info('Fetched all orders');
        res.send(orders);
    } catch (error) {
        logger.error('Error fetching orders:', error);
        res.status(500).send('Error fetching orders');
    }
};

exports.getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findById(id);
        if (!order) {
            logger.warn(`Order not found: ${id}`);
            return res.status(404).send('Order not found');
        }
        logger.info(`Fetched order: ${id}`);
        res.send(order);
    } catch (error) {
        logger.error(`Error fetching order: ${id}`, error);
        res.status(500).send('Error fetching order');
    }
};

exports.updateOrder = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
        if (!order) {
            logger.warn(`Order not found: ${id}`);
            return res.status(404).send('Order not found');
        }
        logger.info(`Order updated: ${id}`);
        res.send(order);
    } catch (error) {
        logger.error(`Error updating order: ${id}`, error);
        res.status(500).send('Error updating order');
    }
};

exports.deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findByIdAndDelete(id);
        if (!order) {
            logger.warn(`Order not found: ${id}`);
            return res.status(404).send('Order not found');
        }
        logger.info(`Order deleted: ${id}`);
        res.send('Order deleted');
    } catch (error) {
        logger.error(`Error deleting order: ${id}`, error);
        res.status(500).send('Error deleting order');
    }
};