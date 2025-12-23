import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Parent = () => {
  return (
    <div className="min-h-screen bg-gray-200 p-2 md:px-6 ">
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Parent;
