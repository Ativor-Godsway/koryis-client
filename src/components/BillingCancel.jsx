// BillingCancel.jsx
import React from "react";
import { Link } from "react-router-dom";

const BillingCancel = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 text-center max-w-md">
        <div className="text-6xl mb-4">❌</div>
        <h1 className="text-2xl font-bold mb-2 text-red-600">
          Payment Cancelled
        </h1>
        <p className="text-gray-700 mb-6">
          Your subscription was not completed. Please try again if you want to
          subscribe.
        </p>
        <Link
          to={"/student/dashboard"}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default BillingCancel;
