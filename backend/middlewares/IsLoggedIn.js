const jwt = require("jsonwebtoken");
const userModel = require("../models/user.js");

module.exports = async function (req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        const user = await userModel.findById(decoded._id).select("-password");

        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized: User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("🔒 Authentication error:", error);

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
        }
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Unauthorized: Token expired" });
        }

        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};