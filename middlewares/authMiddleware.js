const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(400).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;

        next();
    } catch (error) {
        res.status(500).json({
            message: "Invalid or Expired token",
            error: error.message
        });
    }
}

exports.verifyRole = (role = "Admin") => {
    return (req, res, next) => {
        const userRole = req.user.userRole;
        if (userRole !== role) {
            return res.status(403).json({ message: "Unauthorized access" });
        }
        next();
    };
};