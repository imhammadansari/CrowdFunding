import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DonorDashboard = () => {
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('http://localhost:8080/requests/approvedRequests', {
                    withCredentials: true, // Include cookies in the request
                });
                console.log('API Response:', response.data); // Debug: Log the API response
                setRequests(response.data);
            } catch (error) {
                console.error('Failed to fetch funding requests:', error);
            }
        };
        fetchRequests();
    }, []);

    const handleRowClick = (requestId) => {
        navigate(`/request/${requestId}`);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">All Funding Requests</h2>
            <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-orange-500 text-white">
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Phone Number</th>
                            <th className="px-6 py-3">Date of Birth</th>
                            <th className="px-6 py-3">Amount</th>
                            <th className="px-6 py-3">Roll Number</th>
                            <th className="px-6 py-3">Father's Income</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => (
                            <tr
                                key={request._id || request.id} // Use _id or id based on the API response
                                onClick={() => handleRowClick(request._id || request.id)} // Use _id or id
                                className="cursor-pointer hover:bg-gray-100 even:bg-gray-50"
                            >
                                <td className="px-6 py-4 text-center">{request.name}</td>
                                <td className="px-6 py-4 text-center">{request.phone}</td>
                                <td className="px-6 py-4 text-center">{new Date(request.dob).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-center">{request.amount}</td>
                                <td className="px-6 py-4 text-center">{request.roll_no}</td>
                                <td className="px-6 py-4 text-center">{request.father_income}</td>
                                <td className="px-6 py-4 text-center">{request.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button
                onClick={() => navigate('/')}
                className="block mx-auto mt-8 bg-transparent text-orange-500 border-2 border-orange-500 px-6 py-2 rounded-md hover:bg-orange-500 hover:text-white transition duration-300"
            >
                Back to Dashboard
            </button>
        </div>
    );
};

export default DonorDashboard;