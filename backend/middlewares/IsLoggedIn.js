import jwt from "jsonwebtoken";
import userModel from "../models/user.js";

export default async function (req, res, next) {
    const token = req.cookies.token;

    // Check if token exists
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        // Fetch the user from the database (using `_id` is faster than email)
        const user = await userModel.findById(decoded._id).select("-password");

        // Check if user exists
        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized: User not found" });
        }

        // Attach the user to the request object
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("🔒 Authentication error:", error);

        // Handle specific JWT errors
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
        }
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Unauthorized: Token expired" });
        }

        // Generic error response
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};