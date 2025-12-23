import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Student = () => {
  return (
    <div className="font-arial">
      <Navbar />
      <div className="flex-1 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Student;
