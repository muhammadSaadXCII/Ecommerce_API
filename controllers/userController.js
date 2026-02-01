const bcrypt = require('bcrypt');
const crypto = require("crypto");
const User = require('../models/user');
const jsonwebtoken = require('jsonwebtoken');
const sendEmail = require("../utils/sendEmail");

const generateJWTToken = (id, email, role) => {
    return jsonwebtoken.sign({ userId: id, userEmail: email, userRole: role }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });
};

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        const emailToken = crypto.randomBytes(32).toString("hex");
        const newUser = new User({
            name,
            email,
            password,
            role,
            emailToken,
            emailTokenExpires: Date.now() + 1000 * 60 * 60
        });
        await newUser.save();

        const verifyUrl = `${process.env.BASE_URL}/api/auth/verify-email?token=${emailToken}`;
        await sendEmail({
            to: email,
            subject: "Verify your email",
            html: `
              <h2>Email Verification</h2>
              <p>Click the link below to verify your email:</p>
              <a href="${verifyUrl}">${verifyUrl}</a>
            `
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({
            message: "Error registering user",
            error: error.message
        });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isMatch = await bcrypt.compare(password, user.password);

        if (user && isMatch) {
            if (user.isVerified) {
                res.status(201).json({
                    userId: user.id,
                    userEmail: user.email,
                    userRole: user.role,
                    userToken: generateJWTToken(user.id, user.email, user.role)
                });
            } else {
                return res.status(403).json({ message: "Please verify your email first" });
            }
        } else {
            res.status(401).json({ message: "Invalid Credentials" });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error logging in user",
            error: error.message
        });
    }
};

exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;

        const user = await User.findOne({
            emailToken: token,
            emailTokenExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or Expired token" });
        }

        user.isVerified = true;
        user.emailToken = undefined;
        user.emailTokenExpires = undefined;

        await user.save();

        res.json({ message: "Email verified successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Error verifying user",
            error: error.message
        });
    }
};