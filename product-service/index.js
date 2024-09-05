const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const logger = require('./logger');

const app = express();
app.use(express.json());

const MONGO_URI = "mongodb+srv://phukchai:k4ihGCfZM4QEPrrx@cluster0.nammf.mongodb.net/productDB"

mongoose.connect(MONGO_URI)
    .then(() => logger.info('Connected to MongoDB'))
    .catch(err => logger.error('MongoDB connection error:', err));

app.use('/api/products', (req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
}, productRoutes);

app.listen(3002, () => logger.info('Product Service is running on port 3002'));