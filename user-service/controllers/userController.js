const User = require('../models/userModel');
const bcrypt = require('bcryptjs'); // ใช้ bcryptjs แทน bcrypt
const jwt = require('jsonwebtoken');
const logger = require('../logger');
require('dotenv').config();

exports.registerUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        logger.info(`User registered: ${username}`);
        res.status(201).send('User registered');
    } catch (error) {
        logger.error('Error registering user:', error);
        res.status(500).send('Error registering user');
    }
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            logger.warn(`Failed login attempt for username: ${username}`);
            return res.status(401).send('Invalid credentials');
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        logger.info(`User logged in: ${username}`);
        res.send({ token });
    } catch (error) {
        logger.error('Error logging in user:', error);
        res.status(500).send('Error logging in');
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            logger.warn(`User not found for userId: ${req.user.userId}`);
            return res.status(404).send('User not found');
        }
        logger.info(`User profile fetched for userId: ${req.user.userId}`);
        res.send(user);
    } catch (error) {
        logger.error('Error fetching user profile:', error);
        res.status(500).send('Error fetching user profile');
    }
};