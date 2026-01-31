const express = require('express');
const { protect } = require("../middlewares/authMiddleware");
const { createOrder, getMyOrders } = require('../controllers/orderController');

const router = express.Router();

router.use(protect);

router.post("/", createOrder);
router.get("/myOrders", getMyOrders);

module.exports = router;