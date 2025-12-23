import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { MdOutlineMailOutline } from "react-icons/md";
import TermsAndConditions from "../TermsAndConditions";

const Footer = () => {
  const [openPolicy, setOpenPolicy] = useState(false);

  return (
    <footer className=" bottom-0  w-full">
      {/* Links */}
      <div className="w-full py-10 bg-gray-900 text-white flex flex-col items-center gap-6 px-6 md:px-16">
        <h3 className="text-xl md:text-3xl font-bold">KORYIS</h3>
        <p className="text-center md:text-xl">
          Join our community and unlock your child's potential.
        </p>

        <div className="flex flex-col md:flex-row gap-6 md:gap-16 mt-4">
          <a
            href="#"
            className="flex flex-col items-center hover:text-gray-400"
          >
            <FaInstagram className="text-2xl md:text-3xl" />
            <p>@koryis_official</p>
          </a>
          <a
            href="#"
            className="flex flex-col items-center hover:text-gray-400"
          >
            <FaLinkedin className="text-2xl md:text-3xl" />
            <p>Koryis</p>
          </a>
          <a
            href="tel:+447783370012"
            className="flex flex-col items-center hover:text-gray-400"
          >
            <IoMdCall className="text-2xl md:text-3xl" />
            <p>+44 7783 370012</p>
          </a>
          <a
            href="mailto:koryisresource@gmail.com"
            className="flex flex-col items-center hover:text-gray-400"
          >
            <MdOutlineMailOutline className="text-2xl md:text-3xl" />
            <p>koryisresource@gmail.com</p>
          </a>
        </div>

        <div className="text-center">
          <p
            onClick={() => setOpenPolicy(true)}
            className="text-gray-400 text-sm mt-4 cursor-pointer underline"
          >
            Privacy Policy | Terms of Service
          </p>

          <p className="text-gray-400 text-sm ">
            &copy; 2025 Koryis. All rights reserved. | Designed with dyslexic
            learners in mind
          </p>
        </div>
      </div>

      {openPolicy && (
        <TermsAndConditions onClose={() => setOpenPolicy(false)} />
      )}
    </footer>
  );
};

export default Footer;
