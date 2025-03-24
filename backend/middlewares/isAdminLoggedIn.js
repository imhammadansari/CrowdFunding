import jwt from "jsonwebtoken";
import userModel from "../models/admin.js";

export default async function (req, res, next) {
    const token = req.cookies.token;

    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: "You need to login first" });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        // Fetch the user from the database
        const user = await userModel.findOne({ email: decoded.email }).select("-password");

        // Check if user exists
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Attach the user to the request object
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Authentication error:", error);

        // Handle specific JWT errors
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token" });
        }
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        }

        // Generic error response
        return res.status(401).json({ message: "Authentication failed" });
    }
};