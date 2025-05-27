import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllPayments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch all payments from the backend
    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get('https://funding-platform.up.railway.app/payments/all');
                setPayments(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching payments:', error);
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="p-5 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-4">All Payments</h2>
            <Link
                to="/admin_dashboard"
                className="inline-block mb-6 px-4 py-2 text-orange-500 border-2 border-orange-500 rounded-md hover:bg-orange-500 hover:text-white transition duration-300"
            >
                Back to Dashboard
            </Link>

            {/* Responsive Table Container */}
            <div className="overflow-x-auto">
                <table className="w-full bg-white border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-orange-500 text-white">
                            <th className="p-3 border border-gray-300">Donor Name</th>
                            <th className="p-3 border border-gray-300">Donor Email</th>
                            <th className="p-3 border border-gray-300">Amount</th>
                            <th className="p-3 border border-gray-300">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment) => (
                            <tr key={payment._id} className="hover:bg-gray-50 transition duration-200">
                                <td className="p-3 border border-gray-300 text-center">{payment.donorName}</td>
                                <td className="p-3 border border-gray-300 text-center">{payment.donorEmail}</td>
                                <td className="p-3 border border-gray-300 text-center">{payment.amount} PKR</td>
                                <td className="p-3 border border-gray-300 text-center">{payment.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllPayments;