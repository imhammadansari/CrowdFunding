const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');
const paymentRoutes = require('./routes/paymentRoutes.js');
const requestRoutes = require('./routes/requestRoutes.js'); 


dotenv.config();

const requiredEnvVars = ['MONGODB_URL', 'PORT'];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        console.error(`Missing required environment variable: ${envVar}`);
        process.exit(1);
    }
}

const app = express();

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

const corsOptions = {
    origin: 'https://crowd-funding-rose.vercel.app',
    credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/users', authRoutes);
app.use('/admin', adminRoutes);
app.use('/requests', requestRoutes);
app.use('/payments', paymentRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
    await connectDb();
    console.log(`Server running on http://localhost:${PORT}`);
});