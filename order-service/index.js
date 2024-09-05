const express = require('express');
const mongoose = require('mongoose');
const orderRoutes = require('./routes/orderRoutes');
const logger = require('./logger');

const app = express();
app.use(express.json());

const MONGO_URI = "mongodb+srv://phukchai:k4ihGCfZM4QEPrrx@cluster0.nammf.mongodb.net/orderDB"

mongoose.connect(MONGO_URI)
    .then(() => logger.info('Connected to MongoDB'))
    .catch(err => logger.error('MongoDB connection error:', err));

app.use('/api/orders', (req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
}, orderRoutes);

app.listen(3003, () => logger.info('Order Service is running on port 3003'));