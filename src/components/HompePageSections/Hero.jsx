import React from "react";
import { Link } from "react-router-dom";

import { useRef } from "react";
import VariableProximity from "./VariableProximity";

const Hero = () => {
  const containerRef = useRef(null);
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-purple-50"
    >
      {/* SINGLE BLUR BEHIND TEXT */}
      <div className="absolute top-1 -left-2 w-[420px] h-[420px] bg-purple-200 rounded-full blur-[140px] z-0 pointer-events-none" />

      {/* GRID OVERLAY */}
      <div className="opacity-30 absolute z-0 inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 pt-24 md:pt-24 flex flex-col md:flex-row items-center gap-5 md:gap-20">
        {/* TEXT */}
        <div className="relative flex flex-col gap-6 md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight text-gray-900">
            AI-driven learning for dyslexic students.
          </h1>

          <div ref={containerRef} style={{ position: "relative" }}>
            <VariableProximity
              label={"Hover me! And then star React Bits on GitHub, or else..."}
              className={"variable-proximity-demo"}
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={containerRef}
              radius={100}
              falloff="linear"
            />
          </div>

          <p className="text-lg md:text-2xl text-gray-600 max-w-xl">
            IC (Intelligent Companion) is an adaptive assessment platform built
            for dyslexic learners, supporting Maths mastery through
            personalized, responsive questioning that adapts in real time.
          </p>

          {/* CTA */}
          <Link to="/register">
            <div className="mt-8 flex justify-center md:justify-start">
              <button className="px-8 py-4 rounded-2xl bg-purple-600 text-white text-lg font-medium shadow-lg hover:bg-purple-700 hover:shadow-xl transition-all duration-300">
                Start 7-day free trial
              </button>
            </div>
          </Link>
        </div>

        {/* IMAGE */}
        <div className="relative md:w-1/2 flex justify-center">
          <img
            src="Hero_image2.png"
            alt="IC platform illustration"
            className="w-full max-w-lg drop-shadow-[0_40px_80px_rgba(0,0,0,0.15)] animate-float"
          />
        </div>
      </div>

      {/* FLOAT ANIMATION */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          .animate-float {
            animation: float 7s ease-in-out infinite;
          }
        `}
      </style>
    </section>
  );
};

export default Hero;
