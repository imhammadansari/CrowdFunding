import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from "path";

import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import requestRoutes from './routes/requestRoutes.js'; // Import requestRoutes
const __dirname = path.resolve();


// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['MONGODB_URL', 'PORT'];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        console.error(`Missing required environment variable: ${envVar}`);
        process.exit(1);
    }
}

const url = `https://crowdfunding-5ttm.onrender.com`;
const interval = 30000;

function reloadWebsite() {
  axios
    .get(url)
    .then((response) => {
      console.log("website reloded");
    })
    .catch((error) => {
      console.error(`Error : ${error.message}`);
    });
}

setInterval(reloadWebsite, interval);


const app = express();

// Database connection
const URL = process.env.MONGODB_URL;
const connectDb = async () => {
    try {
        await mongoose.connect(URL);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

// CORS configuration
const corsOptions = {
    origin: 'https://crowdfunding-5ttm.onrender.com',
    credentials: true,
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/users', authRoutes);
app.use('/admin', adminRoutes);
app.use('/requests', requestRoutes);
app.use('/payments', paymentRoutes);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.use(express.static(path.join(__dirname, "/react-app/build")));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "react-app", "build", "index.html"));
})

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
    await connectDb(); // Connect to the database before starting the server
    console.log(`Server running on http://localhost:${PORT}`);
});