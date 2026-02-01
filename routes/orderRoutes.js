const express = require('express');
const { protect, verifyRole } = require("../middlewares/authMiddleware");
const { createOrder, getMyOrders } = require('../controllers/orderController');

const router = express.Router();

router.use(protect);

router.post("/", verifyRole("Customer"), createOrder);
router.get("/my-orders", verifyRole("Customer"), getMyOrders);

module.exports = router;