import React from "react";
import { Link } from "react-router-dom";

const MobileNavbar = ({ onClose }) => {
  return (
    <>
      <div className="bg-black bg-opacity-85 w-full lg:hidden">
        <div className="w-[18rem] h-screen bg-white flex flex-col">
          <div className="w-full h-[6rem] justify-center px-4 py-2 bg-black flex flex-col gap-2 bg-opacity-30">
            <div className="flex justify-between">
              <img className="w-12" src="Avatar.png" alt="Avatar" />
              
            </div>
            <h1 className="flex items-start">
              <Link to="/login">Log in</Link> | <Link to="/signup">Register</Link>
            </h1>
          </div>

          <div className="flex flex-col">
            <ul className="flex flex-col text-start px-4 py-2 border-b border-black border-opacity-30 text-black gap-4 text-base w-full">
              <li className="flex">
                <Link to="/home">Home</Link>
              </li>
              <li className="flex">
                <Link to="/returnpolicy">Return Policy</Link>
              </li>
              <li className="flex">
                <Link to="/orderdetails">Orders</Link>
              </li>
              <li className="flex">
                <Link to="/cart">Cart</Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col">
            <ul className="flex flex-col text-start px-4 py-2 text-black gap-4 text-base w-full">
              <li className="flex">
                <Link to="/">Contact Us</Link>
              </li>
              <li className="flex">
                <Link to="/returnpolicy">About</Link>
              </li>
              <li className="flex">
                <Link to="/returnpolicy">Return Policy</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavbar;
