const Review = require('../models/reviewModel');
const logger = require('../logger');

exports.addReview = async (req, res) => {
    const { productId, userId, rating, comment } = req.body;
    try {
        const review = new Review({ productId, userId, rating, comment });
        await review.save();
        logger.info(`Review added for product: ${productId} by user: ${userId}`);
        res.status(201).send('Review added');
    } catch (error) {
        logger.error('Error adding review:', error);
        res.status(500).send('Error adding review');
    }
};

exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        logger.info('Fetched all reviews');
        res.send(reviews);
    } catch (error) {
        logger.error('Error fetching reviews:', error);
        res.status(500).send('Error fetching reviews');
    }
};

exports.getReviewById = async (req, res) => {
    const { id } = req.params;
    try {
        const review = await Review.findById(id);
        if (!review) {
            logger.warn(`Review not found: ${id}`);
            return res.status(404).send('Review not found');
        }
        logger.info(`Fetched review: ${id}`);
        res.send(review);
    } catch (error) {
        logger.error(`Error fetching review: ${id}`, error);
        res.status(500).send('Error fetching review');
    }
};

exports.updateReview = async (req, res) => {
    const { id } = req.params;
    const { rating, comment } = req.body;
    try {
        const review = await Review.findByIdAndUpdate(id, { rating, comment }, { new: true });
        if (!review) {
            logger.warn(`Review not found: ${id}`);
            return res.status(404).send('Review not found');
        }
        logger.info(`Review updated: ${id}`);
        res.send(review);
    } catch (error) {
        logger.error(`Error updating review: ${id}`, error);
        res.status(500).send('Error updating review');
    }
};

exports.deleteReview = async (req, res) => {
    const { id } = req.params;
    try {
        const review = await Review.findByIdAndDelete(id);
        if (!review) {
            logger.warn(`Review not found: ${id}`);
            return res.status(404).send('Review not found');
        }
        logger.info(`Review deleted: ${id}`);
        res.send('Review deleted');
    } catch (error) {
        logger.error(`Error deleting review: ${id}`, error);
        res.status(500).send('Error deleting review');
    }
};