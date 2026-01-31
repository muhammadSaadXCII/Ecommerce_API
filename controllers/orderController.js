const Order = require('../models/order');

exports.createOrder = async (req, res) => {
    try {
        const body = req.body;
        const order = await Order.create({
            userId: req.user.userId,
            items: body.items,
            totalPrice: body.totalPrice
        });

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({
            message: "Error creating order",
            error: error.message
        });
    }
};

exports.getMyOrders = async (req, res) => {
    try {
        const userId = req.user.userId;
        const order = Order.find({ userId }).populate("items.product");
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: "No orders found" });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error fetching orders",
            error: error.message
        });
    }
};