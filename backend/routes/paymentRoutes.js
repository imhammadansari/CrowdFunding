const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const dotenv = require('dotenv');

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/paymentModel.js');
const FundingRequest = require('../models/fundingRequest.js'); 

router.post('/pay/:id', async (req, res) => { 
    const { donorName, donorEmail, donorPhone, amount } = req.body;
    const requestId = req.params.id;

    try {
        const request = await FundingRequest.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

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

        const payment = new Payment({
            requestId: request._id,
            donorName,
            donorEmail,
            donorPhone,
            amount,
            status: 'success', 
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
        const payment = await Payment.findOne({ requestId }).populate('requestId');
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.status(200).json({ payment });
    } catch (error) {
        console.error('Failed to fetch payment details:', error);
        res.status(500).json({ message: 'Failed to fetch payment details' });
    }
});

router.get('/total', async (req, res) => {
    try {
        const payments = await Payment.find({});

        const totalPayments = payments.reduce((total, payment) => total + payment.amount, 0);

        res.status(200).json({ totalPayments });
    } catch (error) {
        console.error('Error calculating total payments:', error);
        res.status(500).json({ message: 'Failed to calculate total payments' });
    }
});

router.get('/all', async (req, res) => {
    try {
        const payments = await Payment.find({});
        res.status(200).json(payments);
    } catch (error) {
        console.error('Error fetching payments:', error);
        res.status(500).json({ message: 'Failed to fetch payments' });
    }
});

module.exports = router;