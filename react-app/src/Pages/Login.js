import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const succesNotify = () => {
    toast.error('User loggedin successfully', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  }

  const notify = () => {
    toast.error('Email or Password Incorrect', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  };

  axios.defaults.withCredentials = true;
  const submit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:8080/users/login', {
            email: email,
            password: password,
        });

        if (response.status === 201 && response.data.message === "User loggedin successfully") {
            localStorage.setItem('userId', response.data.user._id);
            localStorage.setItem('userName', response.data.user.name);
            succesNotify();

            setTimeout(() => navigate('/dashboard'), 3000);
        } else {
            console.log("Login failed:", response.data);
            notify();
        }
    } catch (error) {
        console.log("Error during login:", error);
        notify();
    }
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h1>
        <form className="flex flex-col space-y-4" onSubmit={submit}>
          <input
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            type="email"
            required
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            type="password"
            required
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition duration-300"
            type="submit"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-orange-500 hover:underline">
            Create Account
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;