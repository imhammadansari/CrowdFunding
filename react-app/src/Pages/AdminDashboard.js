import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPayments, setTotalPayments] = useState(0); // State for total payments
    const navigate = useNavigate(); // Hook for navigation

    // Fetch requests and total payments from the backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch requests
                const response = await axios.get('http://localhost:8080/requests/getAllRequests', {
                    withCredentials: true, // Include cookies in the request
                });
                setRequests(response.data);

                // Fetch total payments
                const paymentsResponse = await axios.get('http://localhost:8080/payments/total');
                setTotalPayments(paymentsResponse.data.totalPayments);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Update request status (Approve/Reject)
    const updateRequestStatus = async (id, status) => {
        try {
            const response = await axios.post(`http://localhost:8080/requests/updateStatus/${id}`, { status });
            if (response.data.success) {
                // Update the local state to reflect the new status
                setRequests((prevRequests) =>
                    prevRequests.map((request) =>
                        request._id === id ? { ...request, status } : request
                    )
                );
            }
        } catch (error) {
            console.error('Error updating request status:', error);
        }
    };

    // Handle row click to navigate to request details
    const handleRowClick = (id) => {
        navigate(`/requests/${id}`);
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="p-5 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
            <p className="mb-4">Total Payments: {totalPayments} PKR</p>
            <Link
                to="/all_payments" // Navigate to the all_payments route
                className="inline-block mb-6 px-4 py-2 text-orange-500 border-2 border-orange-500 rounded-md hover:bg-orange-500 hover:text-white transition duration-300"
            >
                View Payments
            </Link>

            {/* Responsive Table Container */}
            <div className="overflow-x-auto">
                <table className="w-full bg-white border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-orange-500 text-white">
                            <th className="p-3 border border-gray-300">Name</th>
                            <th className="p-3 border border-gray-300">Phone</th>
                            <th className="p-3 border border-gray-300">Amount</th>
                            <th className="p-3 border border-gray-300">Roll No</th>
                            <th className="p-3 border border-gray-300">Father's Income</th>
                            <th className="p-3 border border-gray-300">Status</th>
                            <th className="p-3 border border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => (
                            <tr
                                key={request._id}
                                className="hover:bg-gray-50 transition duration-200 cursor-pointer"
                                onClick={() => handleRowClick(request._id)} // Navigate to request details
                            >
                                <td className="p-3 border border-gray-300 text-center">{request.name}</td>
                                <td className="p-3 border border-gray-300 text-center">{request.phone}</td>
                                <td className="p-3 border border-gray-300 text-center">{request.amount} PKR</td>
                                <td className="p-3 border border-gray-300 text-center">{request.roll_no}</td>
                                <td className="p-3 border border-gray-300 text-center">{request.father_income} PKR</td>
                                <td className="p-3 border border-gray-300 text-center">{request.status}</td>
                                <td className="p-3 border border-gray-300 text-center">
                                    {request.status === 'Pending' ? (
                                        <>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent row click event
                                                    updateRequestStatus(request._id, 'Approved');
                                                }}
                                                className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 mr-2"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent row click event
                                                    updateRequestStatus(request._id, 'Rejected');
                                                }}
                                                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    ) : (
                                        <span className="text-gray-700">{request.status}</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="text-center mt-6">
                <Link
                    to="/home"
                    className="inline-block px-4 py-2 text-orange-500 border-2 border-orange-500 rounded-md hover:bg-orange-500 hover:text-white transition duration-300"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;