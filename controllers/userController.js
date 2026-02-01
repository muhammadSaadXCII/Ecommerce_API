const bcrypt = require('bcrypt');
const User = require('../models/user');
const jsonwebtoken = require('jsonwebtoken');

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

        const newUser = new User({
            name,
            email,
            password,
            role,
        });
        await newUser.save();

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
            res.status(201).json({
                userId: user.id,
                userEmail: user.email,
                userRole: user.role,
                userToken: generateJWTToken(user.id, user.email, user.role)
            });
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