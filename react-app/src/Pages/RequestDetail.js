import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const RequestDetail = () => {
    const { id } = useParams(); // Get the request ID from the URL
    const [request, setRequest] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/requests/${id}`, {
                    withCredentials: true, // Include cookies in the request
                });
                setRequest(response.data);
            } catch (error) {
                console.error('Failed to fetch request details:', error);
            }
        };
        fetchRequest();
    }, [id]);

    if (!request) {
        return <div className="text-center py-8">Loading...</div>;
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Funding Request Details</h1>
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className="text-gray-700"><strong>ID:</strong> {request.id}</p>
                    </div>
                    <div>
                        <p className="text-gray-700"><strong>Name:</strong> {request.name}</p>
                    </div>
                    <div>
                        <p className="text-gray-700"><strong>Date of Birth:</strong> {new Date(request.dob).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <p className="text-gray-700"><strong>CNIC:</strong> {request.cnic}</p>
                    </div>
                    <div>
                        <p className="text-gray-700"><strong>Phone:</strong> {request.phone}</p>
                    </div>
                    <div>
                        <p className="text-gray-700"><strong>Amount:</strong> {request.amount}</p>
                    </div>
                    <div>
                        <p className="text-gray-700"><strong>Roll Number:</strong> {request.roll_no}</p>
                    </div>
                    <div>
                        <p className="text-gray-700"><strong>Father Name:</strong> {request.father_name}</p>
                    </div>
                    <div>
                        <p className="text-gray-700"><strong>Father Income:</strong> {request.father_income}</p>
                    </div>
                    <div>
                        <p className="text-gray-700"><strong>Status:</strong> {request.status}</p>
                    </div>
                    <div>
                        <p className="text-gray-700"><strong>Submitted At:</strong> {new Date(request.created_at).toLocaleString()}</p>
                    </div>
                    <div className="col-span-1 md:col-span-2">
                        <p className="text-gray-700"><strong>Your Message:</strong></p>
                        <p className="text-gray-700">{request.text}</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-center gap-4 mt-8">
                <button
                    onClick={() => navigate(`/payment_form/${request.id}`)}
                    className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition duration-300"
                >
                    Go to Payment
                </button>
                <button
                    onClick={() => navigate('/view_history')}
                    className="bg-transparent text-orange-500 border-2 border-orange-500 px-6 py-2 rounded-md hover:bg-orange-500 hover:text-white transition duration-300"
                >
                    Back to History
                </button>
            </div>
        </div>
    );
};

export default RequestDetail;