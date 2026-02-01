const express = require('express');
const { registerUser, loginUser, verifyEmail } = require('../controllers/userController');

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/verify-email", verifyEmail);

module.exports = router;