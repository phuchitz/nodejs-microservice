const Product = require('../models/productModel');
const logger = require('../logger');

exports.addProduct = async (req, res) => {
    const { name, price, description, inStock } = req.body;
    try {
        const product = new Product({ name, price, description, inStock });
        await product.save();
        logger.info(`Product added: ${name}`);
        res.status(201).send('Product added');
    } catch (error) {
        logger.error('Error adding product:', error);
        res.status(500).send('Error adding product');
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        logger.info('Fetched all products');
        res.send(products);
    } catch (error) {
        logger.error('Error fetching products:', error);
        res.status(500).send('Error fetching products');
    }
};

exports.getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            logger.warn(`Product not found: ${id}`);
            return res.status(404).send('Product not found');
        }
        logger.info(`Fetched product: ${id}`);
        res.send(product);
    } catch (error) {
        logger.error(`Error fetching product: ${id}`, error);
        res.status(500).send('Error fetching product');
    }
};

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, description, inStock } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(id, { name, price, description, inStock }, { new: true });
        if (!product) {
            logger.warn(`Product not found: ${id}`);
            return res.status(404).send('Product not found');
        }
        logger.info(`Product updated: ${id}`);
        res.send(product);
    } catch (error) {
        logger.error(`Error updating product: ${id}`, error);
        res.status(500).send('Error updating product');
    }
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            logger.warn(`Product not found: ${id}`);
            return res.status(404).send('Product not found');
        }
        logger.info(`Product deleted: ${id}`);
        res.send('Product deleted');
    } catch (error) {
        logger.error(`Error deleting product: ${id}`, error);
        res.status(500).send('Error deleting product');
    }
};