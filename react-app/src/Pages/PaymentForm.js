import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PaymentForm = () => {
    const { id } = useParams(); // Get the request ID from the URL
    const [donorName, setDonorName] = useState('');
    const [donorEmail, setDonorEmail] = useState('');
    const [donorPhone, setDonorPhone] = useState('');
    const [fundingRequest, setFundingRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch funding request details from the backend
    useEffect(() => {
        const fetchFundingRequest = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/requests/requests/${id}`);
                setFundingRequest(response.data); // Set the funding request details
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch funding request:', error);
                setError('Failed to fetch funding request details. Please try again later.');
                setLoading(false);
            }
        };

        fetchFundingRequest();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:8080/payments/pay/${id}`, {
                requestId: id,
                donorName,
                donorEmail,
                donorPhone,
                amount: fundingRequest.amount,
                status: 'success',
            });

            // Redirect to Stripe checkout page
            window.location.href = response.data.url;

            await axios.post(`http://localhost:8080/requests/updateStatus/${id}`, {
                status: 'Paid',
            });
        } catch (error) {
            console.error('Payment failed:', error.response ? error.response.data : error.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!fundingRequest) {
        return <div>Funding request not found.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Payment Form</h1>
            <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 mx-auto max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column: Donor Information */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Donor Information</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={donorName}
                                onChange={(e) => setDonorName(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                value={donorEmail}
                                onChange={(e) => setDonorEmail(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Your Phone"
                                value={donorPhone}
                                onChange={(e) => setDonorPhone(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition duration-300"
                            >
                                Submit Payment
                            </button>
                        </form>
                    </div>

                    {/* Right Column: Payment Details */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Request ID:</span>
                                    <span className="font-medium">{fundingRequest._id || fundingRequest.id}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Request Name:</span>
                                    <span className="font-medium">{fundingRequest.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Total Amount:</span>
                                    <span className="font-medium">PKR {fundingRequest.amount}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentForm;