import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = React.useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/user/checkLogin', {
                    withCredentials: true
                });
                if (response.data.isLoggedIn) {
                    setUser(response.data.user);
                    localStorage.setItem('userId', response.data.user._id);
                    localStorage.setItem('userName', response.data.user.name);
                } else {
                    navigate('/login');
                }
            } catch (error) {
                console.error('Authentication check failed:', error);
                navigate('/login');
            }
        };
        checkAuth();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:5000/api/user/logout', {
                withCredentials: true
            });
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white rounded-lg shadow-md w-full max-w-md p-10 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome to Your Dashboard</h2>
                <p className="text-lg text-gray-600 mb-8">Hello, {user.name}!</p>

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