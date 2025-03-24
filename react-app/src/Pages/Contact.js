import React from 'react';
import Header from '../Components/Header';

const Contact = () => {
  return (
    <>
    <Header />
    <div className="font-sans bg-white">
      {/* Contact Title */}
      <h1 className="text-3xl md:text-4xl text-center text-gray-800 font-bold mt-8 mb-6">
        Contact Us
      </h1>

      {/* Contact Container */}
      <div className="flex flex-col md:flex-row justify-between items-start max-w-6xl mx-auto p-4 gap-8">
        {/* Contact Form */}
        <form
          action="/submit_contact"
          method="POST"
          className="flex-1 w-full md:max-w-[50%] bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm"
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Contact Image (Lottie Animation) */}
        <div className="flex-1 w-full flex justify-center items-center">
          <dotlottie-player
            src="https://lottie.host/6e2109ca-2361-4cad-89ae-c7d4aa71048e/ESHDk02inX.lottie"
            background="transparent"
            speed="1"
            style={{ width: '70%', height: 'auto' }}
            loop
            autoplay
          ></dotlottie-player>
        </div>
      </div>
    </div>
    </>
  );
};

export default Contact;