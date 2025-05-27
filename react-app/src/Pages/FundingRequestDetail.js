import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FundingRequestDetail = () => {
    const { id } = useParams(); 
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRequestDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/requests/requests/${id}`);
                if (response.status === 404) {
                    setError('Request not found.');
                } else {
                    setRequest(response.data); 
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

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleString();
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
                        <p className="text-gray-700"><strong>ID:</strong> {request._id || 'N/A'}</p>
                    </div>
                    <div className="p-2">
                        <p className="text-gray-700"><strong>Name:</strong> {request.name || 'N/A'}</p>
                    </div>
                    <div className="p-2">
                        <p className="text-gray-700"><strong>Date of Birth:</strong> {request.dob || 'N/A'}</p>
                    </div>
                    <div className="p-2">
                        <p className="text-gray-700"><strong>CNIC:</strong> {request.cnic || 'N/A'}</p>
                    </div>
                    <div className="p-2">
                        <p className="text-gray-700"><strong>Phone:</strong> {request.phone || 'N/A'}</p>
                    </div>
                    <div className="p-2">
                        <p className="text-gray-700"><strong>Amount:</strong> {request.amount ? `${request.amount} PKR` : 'N/A'}</p>
                    </div>
                    <div className="p-2">
                        <p className="text-gray-700"><strong>Roll Number:</strong> {request.roll_no || 'N/A'}</p>
                    </div>
                    <div className="p-2">
                        <p className="text-gray-700"><strong>Father Name:</strong> {request.father_name || 'N/A'}</p>
                    </div>
                    <div className="p-2">
                        <p className="text-gray-700"><strong>Father Income:</strong> {request.father_income ? `${request.father_income} PKR` : 'N/A'}</p>
                    </div>
                    <div className="p-2">
                        <p className="text-gray-700"><strong>Status:</strong> {request.status || 'N/A'}</p>
                    </div>
                    <div className="p-2">
                        <p className="text-gray-700"><strong>University Name:</strong> {request.university_name || 'N/A'}</p>
                    </div>
                    
                    <div className="col-span-full p-2">
                        <p className="text-gray-700"><strong>Message:</strong></p>
                        <p className="text-gray-700">{request.text || 'N/A'}</p>
                    </div>
                </div>
            </div>
            <button
                onClick={() => navigate('/admin_dashboard')}
                className="block mx-auto mt-6 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300"
            >
                Back to Dashboard
            </button>
        </div>
    );
};

export default FundingRequestDetail;