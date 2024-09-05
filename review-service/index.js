const express = require('express');
const mongoose = require('mongoose');
const reviewRoutes = require('./routes/reviewRoutes');
const logger = require('./logger');

const app = express();
app.use(express.json());

const MONGO_URI = "mongodb+srv://phukchai:k4ihGCfZM4QEPrrx@cluster0.nammf.mongodb.net/reviewDB"

mongoose.connect(MONGO_URI)
    .then(() => logger.info('Connected to MongoDB'))
    .catch(err => logger.error('MongoDB connection error:', err));

app.use('/api/reviews', (req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
}, reviewRoutes);

app.listen(3005, () => logger.info('Review Service is running on port 3005'));