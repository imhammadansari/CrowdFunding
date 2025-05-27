const jwt = require('jsonwebtoken');
const userModel = require("../models/admin.js");

module.exports = async function (req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "You need to login first" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        const user = await userModel.findOne({ email: decoded.email }).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next(); 
    } catch (error) {
        console.error("Authentication error:", error);

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token" });
        }
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        }

        return res.status(401).json({ message: "Authentication failed" });
    }
};