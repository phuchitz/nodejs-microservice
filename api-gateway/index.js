const express = require('express');
const axios = require('axios');
const logger = require('./logger');

const app = express();
app.use(express.json());

// Middleware to log incoming requests
app.use((req, res, next) => {
    logger.info(`Received ${req.method} request for ${req.url}`);
    next();
});

// Proxy requests to User Service
app.use('/api/users', async (req, res) => {
    try {
        const response = await axios({
            method: req.method,
            url: `http://user-service:3001${req.url}`,
            data: req.body,
            headers: req.headers
        });
        res.status(response.status).send(response.data);
    } catch (error) {
        logger.error(`Error proxying request to User Service: ${error.message}`);
        res.status(500).send('Error proxying request');
    }
});

// Proxy requests to Product Service
app.use('/api/products', async (req, res) => {
    try {
        const response = await axios({
            method: req.method,
            url: `http://product-service:3002${req.url}`,
            data: req.body,
            headers: req.headers
        });
        res.status(response.status).send(response.data);
    } catch (error) {
        logger.error(`Error proxying request to Product Service: ${error.message}`);
        res.status(500).send('Error proxying request');
    }
});

// Proxy requests to Order Service
app.use('/api/orders', async (req, res) => {
    try {
        const response = await axios({
            method: req.method,
            url: `http://order-service:3003${req.url}`,
            data: req.body,
            headers: req.headers
        });
        res.status(response.status).send(response.data);
    } catch (error) {
        logger.error(`Error proxying request to Order Service: ${error.message}`);
        res.status(500).send('Error proxying request');
    }
});

// Proxy requests to Payment Service
app.use('/api/payments', async (req, res) => {
    try {
        const response = await axios({
            method: req.method,
            url: `http://payment-service:3004${req.url}`,
            data: req.body,
            headers: req.headers
        });
        res.status(response.status).send(response.data);
    } catch (error) {
        logger.error(`Error proxying request to Payment Service: ${error.message}`);
        res.status(500).send('Error proxying request');
    }
});

// Proxy requests to Review Service
app.use('/api/reviews', async (req, res) => {
    try {
        const response = await axios({
            method: req.method,
            url: `http://review-service:3005${req.url}`,
            data: req.body,
            headers: req.headers
        });
        res.status(response.status).send(response.data);
    } catch (error) {
        logger.error(`Error proxying request to Review Service: ${error.message}`);
        res.status(500).send('Error proxying request');
    }
});

app.listen(3000, () => logger.info('API Gateway is running on port 3000'));