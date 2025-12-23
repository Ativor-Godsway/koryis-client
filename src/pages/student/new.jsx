import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="sticky top-0  z-50">
      {/* -------- NAVBAR -------- */}
      <nav className="w-full bg-blue-50 border border-blue-300 shadow-sm px-6 py-4 flex items-center justify-between rounded-3xl mb-3">
        {/* Left Section — Title */}
        <Link to={"/parent/dashboard"}>
          <h1 className="text-xl font-bold text-gray-800">Parent Dashboard</h1>
        </Link>

        {/* Right Section — Actions */}
        <div className="flex items-center gap-6">
          {/* Profile Avatar */}
          <Link to="/parent/profile" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold group-hover:bg-blue-200 transition">
              JD
            </div>
            <span className="font-medium text-gray-700 group-hover:underline">
              Profile
            </span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
