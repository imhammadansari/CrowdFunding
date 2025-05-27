import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess = () => {
    const { requestId } = useParams();
    const navigate = useNavigate();
    const [payment, setPayment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPaymentDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/payments/payment_success/${requestId}`);
                setPayment(response.data.payment);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch payment details:', error);
                setError('Failed to fetch payment details. Please try again later.');
                setLoading(false);
            }
        };

        fetchPaymentDetails();
    }, [requestId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!payment) {
        return <div>No payment details found.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 max-w-2xl w-full">
                <h1 className="text-3xl font-bold text-center text-green-600 mb-6">Payment Successful!</h1>
                <div className="space-y-4">
                    <p><strong>Request ID:</strong> {payment.requestId._id}</p>
                    <p><strong>Request Name:</strong> {payment.requestId.name}</p>
                    <p><strong>Donor Name:</strong> {payment.donorName}</p>
                    <p><strong>Donor Email:</strong> {payment.donorEmail}</p>
                    <p><strong>Donor Phone:</strong> {payment.donorPhone}</p>
                    <p><strong>Amount:</strong> PKR {payment.amount}</p>
                    <p><strong>Status:</strong> {payment.status}</p>
                </div>
                <button
                    onClick={() => navigate('/donor_dashboard')}
                    className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition duration-300 mt-6"
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;