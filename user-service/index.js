const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const logger = require('./logger');
require('dotenv').config();

const app = express();
app.use(express.json());

const mongoURI = process.env.MONGO_URI
const port = process.env.PORT

mongoose.connect(mongoURI)
    .then(() => logger.info('Connected to MongoDB'))
    .catch(err => logger.error('MongoDB connection error:', err));

app.use('/api/users', (req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next(); 
}, userRoutes);

app.listen(port, () => logger.info('User Service is running on port 3001'));