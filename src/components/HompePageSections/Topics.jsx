import React from "react";
import { FaClock, FaGraduationCap, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

const stats = [
  {
    value: "11–16",
    label: "Age Range",
    icon: FaUsers,
  },
  {
    value: "100%",
    label: "UK GCSE Aligned",
    icon: FaGraduationCap,
  },
  {
    value: "24/7",
    label: "Always Available",
    icon: FaClock,
  },
];

const topics = [
  "Number",
  "Algebra",
  "Geometry",
  "Ratio",
  "Probability",
  "Statistics",
];

const Topics = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-100 to-indigo-100 z-10">
      {/* SOFT BACKGROUND GLOW */}
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-white/10 rounded-full blur-[160px]" />
      <div className="absolute bottom-0 -right-32 w-[420px] h-[420px] bg-white/10 rounded-full blur-[160px]" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 text-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-black">
          Built Around the GCSE Maths Curriculum
        </h2>

        {/* Context text */}
        <p className="mt-4 text-xl text-black max-w-3xl mx-auto">IC covers :</p>

        {/* TOPICS */}
        <div className="mt-3 flex flex-wrap justify-center gap-4">
          {topics.map((topic, idx) => (
            <div
              key={idx}
              className="px-5 py-2 rounded-full bg-white/50 backdrop-blur border border-white/20 text-black font-medium hover:bg-white/25 transition-all duration-300"
            >
              {topic}
            </div>
          ))}
        </div>

        {/* STATS */}
        <div className="mt-16 flex flex-wrap gap-8 justify-center">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center px-8 py-6 rounded-3xl bg-white/60 backdrop-blur border border-white/20 shadow-sm transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center gap-2 text-black font-semibold text-2xl">
                  <Icon className="w-6 h-6 text-black/90" />
                  {item.value}
                </div>
                <div className="mt-1 text-black/80 text-sm uppercase tracking-wide">
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Topics;
