import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 

const DefultError = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">

            <FaExclamationTriangle className="text-red-500 text-8xl mb-6 animate-bounce" />


            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>


            <p className="text-xl text-gray-600 mb-6 text-center">
                Oops! The page you are looking for does not exist.
            </p>


            <Link
                to="/"
                className="inline-block bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default DefultError;
