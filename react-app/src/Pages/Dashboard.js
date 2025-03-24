import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const userName = localStorage.getItem('userName') || 'User'; // Get the user's name from localStorage

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        navigate('/login');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white rounded-lg shadow-md w-full max-w-md p-10 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome to Your Dashboard</h2>
                <p className="text-lg text-gray-600 mb-8">Hello, {userName}!</p>

                <button
                    onClick={() => navigate('/post_request')}
                    className="w-full bg-orange-500 text-white py-3 px-4 rounded-md hover:bg-orange-600 transition duration-300 mb-4"
                >
                    Post a Request
                </button>

                <button
                    onClick={() => navigate('/view_history')}
                    className="w-full bg-orange-500 text-white py-3 px-4 rounded-md hover:bg-orange-600 transition duration-300 mb-4"
                >
                    View History
                </button>

                <button
                    onClick={handleLogout}
                    className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition duration-300"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;