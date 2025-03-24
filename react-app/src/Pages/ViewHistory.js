import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewHistory = () => {
    const [fundingRequests, setFundingRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFundingRequests = async () => {
            try {
                const response = await axios.get('https://crowdfunding-5ttm.onrender.com/requests/getRequests', {
                    withCredentials: true,
                });
                console.log('API Response:', response.data);
                setFundingRequests(response.data);
            } catch (error) {
                console.error('Failed to fetch funding requests:', error);
            }
        };
        fetchFundingRequests();
    }, []);

    const handleRowClick = (requestId) => {
        navigate(`/view_request/${requestId}`);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Your Funding Requests</h1>
            <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-orange-500 text-white">
                            <th className="px-6 py-3">Submitted At</th>
                            <th className="px-6 py-3">Amount</th>
                            <th className="px-6 py-3">Father Name</th>
                            <th className="px-6 py-3">Father Income</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fundingRequests.map((request) => (
                            <tr
                                key={request._id}
                                onClick={() => handleRowClick(request._id)}
                                className="cursor-pointer hover:bg-gray-100 even:bg-gray-50"
                            >
                                <td className="px-6 py-4 text-center">
                                    {new Date(request.createdAt).toLocaleDateString()}  {/* Changed to createdAt */}
                                </td>
                                <td className="px-6 py-4 text-center">{request.amount}</td>
                                <td className="px-6 py-4 text-center">{request.father_name}</td>
                                <td className="px-6 py-4 text-center">{request.father_income}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                        request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                        request.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {request.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button
                onClick={() => navigate('/dashboard')}
                className="block mx-auto mt-8 bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition duration-300"
            >
                Back to Dashboard
            </button>
        </div>
    );
};

export default ViewHistory;