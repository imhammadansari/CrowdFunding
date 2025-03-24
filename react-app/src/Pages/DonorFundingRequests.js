import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DonorFundingRequests = () => {
    const { id } = useParams(); // Get the request ID from the URL
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch request details from the backend
    useEffect(() => {
        const fetchRequestDetails = async () => {
            try {
                const response = await axios.get(`https://crowdfunding-5ttm.onrender.com/requests/requests/${id}`);
                if (response.status === 404) {
                    setError('Request not found.');
                } else {
                    setRequest(response.data); // Assuming the API returns the request object
                }
                setLoading(false);
            } catch (err) {
                console.error('Error fetching request details:', err);
                setError('Failed to fetch request details. Please try again later.');
                setLoading(false);
            }
        };

        fetchRequestDetails();
    }, [id]);

    // Handle navigation to the payment form
    const handlePaymentClick = () => {
        navigate(`/payment/${id}`); // Navigate to the payment form route with the request ID
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
    }

    if (!request) {
        return <div className="flex justify-center items-center min-h-screen">Request not found.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Funding Request Details</h1>
            <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 mx-auto max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-2">
                        <p className="text-gray-700"><strong>ID:</strong> {request._id || request.id}</p>
                    </div>
                    <div className="p-2">
                        <p className="text-gray-700"><strong>Name:</strong> {request.name}</p>
                    </div>
                    <div className="p-2">
                        <p className="text-gray-700"><strong>Date of Birth:</strong> {request.dob}</p>
                    </div>
                    <div className="p-2">
                        <p className="text-gray-700"><strong>CNIC:</strong> {request.cnic}</p>
                    </div>
                    <div className="p-2">
                        <p className="text-gray-700"><strong>Phone:</strong> {request.phone}</p>
                    </div>
                    <div className="p-2">
                        <p className="text-gray-700"><strong>Amount:</strong> {request.amount}</p>
                    </div>
                    <div className="p-2">
                        <p className="text-gray-700"><strong>Roll Number:</strong> {request.roll_no}</p>
                    </div>
                    <div className="p-2">
                        <p className="text-gray-700"><strong>Father Name:</strong> {request.father_name}</p>
                    </div>
                    <div className="p-2">
                        <p className="text-gray-700"><strong>Father Income:</strong> {request.father_income}</p>
                    </div>
                    <div className="p-2">
                        <p className="text-gray-700"><strong>Status:</strong> {request.status}</p>
                    </div>
                    <div className="col-span-full p-2">
                        <p className="text-gray-700"><strong>Message:</strong></p>
                        <p className="text-gray-700">{request.text}</p>
                    </div>
                    
                </div>
            </div>
            <div className="flex justify-center gap-4 mt-6">
                <button
                    onClick={() => navigate('/donor_dashboard')}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
                >
                    Back to Dashboard
                </button>
                <button
                    onClick={handlePaymentClick}
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300"
                >
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
};

export default DonorFundingRequests;