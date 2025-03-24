import express from 'express';
const router = express.Router();
import Stripe from 'stripe';
import dotenv from 'dotenv';

// Load environment variables FIRST
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import Payment from '../models/paymentModel.js'; // Import the Payment model
import FundingRequest from '../models/fundingRequest.js'; // Import the FundingRequest model

router.post('/pay/:id', async (req, res) => {
    const { donorName, donorEmail, donorPhone, amount } = req.body;
    const requestId = req.params.id;

    try {
        // Fetch the request details
        const request = await FundingRequest.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        // Create a Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `Funding Request for ${request.name}`,
                        },
                        unit_amount: amount * 100, // Amount in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${req.headers.origin}/payment_success/${requestId}`,
            cancel_url: `${req.headers.origin}/payment_cancelled`,
            customer_email: donorEmail,
        });

        // Save payment details to the database
        const payment = new Payment({
            requestId: request._id,
            donorName,
            donorEmail,
            donorPhone,
            amount,
            status: 'success', // Assuming the payment is successful
        });
        await payment.save();

        res.status(200).json({ url: session.url });
    } catch (error) {
        console.error('Stripe session creation failed:', error);
        res.status(500).json({ message: 'Failed to create payment session' });
    }
});

router.get('/payment_success/:requestId', async (req, res) => {
    const requestId = req.params.requestId;

    try {
        // Fetch the payment details from the database and populate the requestId field
        const payment = await Payment.findOne({ requestId }).populate('requestId');
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        // Send the payment and funding request details to the frontend
        res.status(200).json({ payment });
    } catch (error) {
        console.error('Failed to fetch payment details:', error);
        res.status(500).json({ message: 'Failed to fetch payment details' });
    }
});

router.get('/total', async (req, res) => {
    try {
        // Fetch all payments from the database
        const payments = await Payment.find({});

        // Calculate the total amount
        const totalPayments = payments.reduce((total, payment) => total + payment.amount, 0);

        res.status(200).json({ totalPayments });
    } catch (error) {
        console.error('Error calculating total payments:', error);
        res.status(500).json({ message: 'Failed to calculate total payments' });
    }
});

// Route to get all payments
router.get('/all', async (req, res) => {
    try {
        // Fetch all payments from the database
        const payments = await Payment.find({});
        res.status(200).json(payments);
    } catch (error) {
        console.error('Error fetching payments:', error);
        res.status(500).json({ message: 'Failed to fetch payments' });
    }
});

export default router;