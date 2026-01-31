const Product = require('../models/product');

exports.createProduct = async (req, res) => {
    try {
        const body = req.body;
        const newProduct = new Product(body);
        await Product.save();

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({
            message: "Error creating product",
            error: error.message
        });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching products",
            error: error.message
        });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: "No product found" });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error fetching product",
            error: error.message
        });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const product = await Product.findById(id);
        if (product) {
            Object.keys(body).forEach((key) => {
                product[key] = body[key];
            });
            const updatedProduct = await product.save();
            res.status(200).json(updatedProduct);
        } else {
            return res.status(404).json({ message: "No product found" });
        }

    } catch (error) {
        res.status(500).json({
            message: "Error fetching product",
            error: error.message
        });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "No product found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching product",
            error: error.message
        });
    }
};