import React, { useState } from 'react';

const Header = ({ user }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header>
            {/* Navbar */}
            <nav className="bg-gradient-to-r from-gray-100 via-gray-200 to-white py-4 px-6 md:px-10 shadow-md flex justify-between items-center relative">
                {/* Logo */}
                <div className="text-xl md:text-2xl font-bold">
                    <a href="/" className="text-black no-underline">
                        Crowd<span className="text-orange-500">Funding</span>
                    </a>
                </div>

                {/* Hamburger Menu Icon (Mobile) */}
                <div
                    className="text-2xl cursor-pointer md:hidden z-50"
                    onClick={toggleMenu}
                >
                    &#9776;
                </div>

                {/* Nav Links */}
                <ul
                    className={`fixed md:static top-0 text-xl right-0 h-full md:h-auto w-[200px] md:w-auto bg-orange-500 md:bg-transparent flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-center md:justify-end transition-all duration-300 ease-in-out z-50 ${
                        isMenuOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
                    }`}
                >
                    <li>
                        <a
                            href="/"
                            className="text-white md:text-black hover:bg-gray-100 md:hover:bg-transparent px-4 py-2 rounded-md transition-all"
                            aria-label="Go to Home"
                        >
                            Home
                        </a>
                    </li>
                    <li>
                        <a
                            href="/contact"
                            className="text-white md:text-black hover:bg-gray-100 md:hover:bg-transparent px-4 py-2 rounded-md transition-all"
                            aria-label="Contact Us"
                        >
                            Contact <span className="text-orange-500">Us</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="/donor_dashboard"
                            className="text-white md:text-black hover:bg-gray-100 md:hover:bg-transparent px-4 py-2 rounded-md transition-all"
                            aria-label="Donate Now"
                        >
                            Donate <span className="text-orange-500">Now</span>
                        </a>
                    </li>
                    {user ? (
                        <li>
                            <a
                                href="/dashboard"
                                className="text-white md:text-black hover:bg-gray-100 md:hover:bg-transparent px-4 py-2 rounded-md transition-all"
                                aria-label="Student Dashboard"
                            >
                                {user.name}
                            </a>
                        </li>
                    ) : (
                        <li>
                            <a
                                href="/login"
                                className="text-white md:text-black hover:bg-gray-100 md:hover:bg-transparent px-4 py-2 rounded-md transition-all"
                                aria-label="Login"
                            >
                                Login
                            </a>
                        </li>
                    )}
                </ul>

                {/* Overlay (Mobile) */}
                <div
                    className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 ${
                        isMenuOpen ? 'block' : 'hidden'
                    } md:hidden`}
                    onClick={toggleMenu}
                ></div>
            </nav>
        </header>
    );
};

export default Header;