import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Teacher = () => {
  return (
    <div className="p-2 md:px-5 bg-gray-200 min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Teacher;
