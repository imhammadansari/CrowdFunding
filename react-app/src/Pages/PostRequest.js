import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostRequest = () => {
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        cnic: '',
        phone: '',
        amount: '',
        roll_no: '',
        father_name: '',
        father_income: '',
        university_name: '',
        text: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

        axios.defaults.withCredentials = true;
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/requests/requests', formData, {
                withCredentials: true, // Include cookies in the request
            });
            if (response.data) {
                toast.success('Request submitted successfully!', {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
                setTimeout(() => navigate('/dashboard')); // Redirect after 3 seconds
            }
        } catch (error) {
            toast.error('Failed to submit request. Please try again.', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            console.error(error);
        }
    };

    return (
        <div className="flex justify-center items-start min-h-screen bg-gray-100 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Post a Funding Request</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                id="dob"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="cnic" className="block text-sm font-medium text-gray-700">
                                CNIC
                            </label>
                            <input
                                type="text"
                                id="cnic"
                                name="cnic"
                                value={formData.cnic}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Phone
                            </label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                                Amount
                            </label>
                            <input
                                type="number"
                                id="amount"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="roll_no" className="block text-sm font-medium text-gray-700">
                                Roll Number
                            </label>
                            <input
                                type="text"
                                id="roll_no"
                                name="roll_no"
                                value={formData.roll_no}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="father_name" className="block text-sm font-medium text-gray-700">
                                Father's Name
                            </label>
                            <input
                                type="text"
                                id="father_name"
                                name="father_name"
                                value={formData.father_name}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="father_income" className="block text-sm font-medium text-gray-700">
                                Father's Income
                            </label>
                            <input
                                type="number"
                                id="father_income"
                                name="father_income"
                                value={formData.father_income}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="university_name" className="block text-sm font-medium text-gray-700">
                                University Name
                            </label>
                            <input
                                type="text"
                                id="university_name"
                                name="university_name"
                                value={formData.university_name}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="text" className="block text-sm font-medium text-gray-700">
                                Your Message
                            </label>
                            <textarea
                                id="text"
                                name="text"
                                value={formData.text}
                                onChange={handleChange}
                                rows="4"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition duration-300"
                    >
                        Submit Request
                    </button>
                </form>
                <div className="text-center mt-6">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="bg-transparent text-orange-500 border-2 border-orange-500 py-2 px-6 rounded-md hover:bg-orange-500 hover:text-white transition duration-300"
                    >
                        Back
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default PostRequest;