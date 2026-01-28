import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="fixed w-screen top-0 z-50">
      {/* Glass background */}
      <div className="backdrop-blur-xl bg-white/70 border-b border-base-200">
        <div className="navbar max-w-7xl mx-auto px-4 md:px-8 py-3">
          {/* Brand */}
          <div className="flex-1">
            <a href="#home" className="group flex flex-col">
              <span className="text-2xl md:text-3xl font-semibold tracking-tight text-base-content">
                KORYIS
              </span>
              <span className="text-xs md:text-sm text-base-content/60 group-hover:text-base-content transition">
                Intelligent Companion
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal gap-2 text-base font-medium">
              {[
                { label: "Home", href: "#home" },
                { label: "Why IC", href: "#why-ic" },
                { label: "How it works", href: "#how-it-works" },
                { label: "Dashboards", href: "#dashboards" },
                // { label: "Pricing", href: "#pricing" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="rounded-full px-4 py-2 hover:bg-base-200 transition-all duration-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-full ml-12 font-medium bg-gray-100 hover:bg-gray-200 px-4 py-2 transition-all duration-300 border border-black/10 shadow-sm"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="btn rounded-full bg-gradient-to-r from-primary to-secondary text-white border-none hover:opacity-90 transition-all duration-300 shadow-md hidden lg:flex"
            >
              Free Trial
            </Link>

            {/* Mobile Menu */}
            <div className="dropdown dropdown-end lg:hidden">
              <label tabIndex={0} className="btn btn-ghost rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>

              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 p-4 shadow-xl bg-base-100 rounded-2xl w-56 gap-2"
              >
                <li>
                  <a href="#home">Home</a>
                </li>
                <li>
                  <a href="#why-ic">Why IC</a>
                </li>
                <li>
                  <a href="#how-it-works">How it works</a>
                </li>
                <li>
                  <a href="#dashboards">Dashboards</a>
                </li>
                <li>
                  <a href="#pricing">Pricing</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
