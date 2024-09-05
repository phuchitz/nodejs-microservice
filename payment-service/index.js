const express = require('express');
const mongoose = require('mongoose');
const paymentRoutes = require('./routes/paymentRoutes');
const logger = require('./logger');

const app = express();
app.use(express.json());

const MONGO_URI = "mongodb+srv://phukchai:k4ihGCfZM4QEPrrx@cluster0.nammf.mongodb.net/paymentDB"

mongoose.connect(MONGO_URI)
    .then(() => logger.info('Connected to MongoDB'))
    .catch(err => logger.error('MongoDB connection error:', err));

app.use('/api/payments', (req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
}, paymentRoutes);

app.listen(3004, () => logger.info('Payment Service is running on port 3004'));