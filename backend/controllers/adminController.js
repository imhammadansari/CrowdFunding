import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/admin.js";


// Register a new user
export const registeredUser = async function (req, res) {
    try {
        let { fullname, email, password } = req.body;

        let user = await userModel.findOne({ email: email });
        if (user) return res.status(401).send("You already have an account. Please Login");

        bcrypt.genSalt(10, function (error, salt) {
            bcrypt.hash(password, salt, async function (error, hash) {
                if (error) return res.send(error.message);
                else {
                    let user = await userModel.create({
                        fullname,
                        email,
                        password: hash,
                    });
        
                    let token = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_KEY);
        
                    res.cookie("token", token);
                    res.status(201).json({ message: "User registered successfully", user });
                }
            });
        });

    } catch (error) {
        res.send(error.message);
    }
};
// Login user
export const loginUser = async function (req, res) {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email: email });

    if (!user) {
        console.log("User not found");
        return res.status(401).send("Email or Password Incorrect");
    }

    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            const token = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_KEY);

            res.cookie("token", token);
            res.status(201).json({ message: "User loggedin successfully", user });
        } else {
            console.log("Password incorrect");
            return res.status(401).send("Email or Password Incorrect");
        }
    });
};

// Logout user
export const logout = async function (req, res) {
    try {
        if (req.cookies.token) {
            res.clearCookie("token");
            return res.status(200).json({ message: "User logged out successfully" });
        }
        res.status(400).json({ message: "No user is logged in" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};