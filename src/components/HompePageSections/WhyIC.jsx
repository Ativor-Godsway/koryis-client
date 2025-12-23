import React from "react";
import { Eye, Mic, Infinity } from "lucide-react";

const points = [
  {
    icon: Eye,
    title: "Specially Designed for Dyslexic Learners",
    description:
      "IC is built with accessibility at its core. Clear, high-contrast text and thoughtfully spaced layouts reduce visual stress and support neurodiverse learners.",
  },
  {
    icon: Mic,
    title: "Real-Time Voice Interaction",
    description:
      "Students can hear every question read aloud naturally and respond using their voice, no typing required. IC listens, understands, and guides learners in a calm, supportive way.",
  },
  {
    icon: Infinity,
    title: "Unlimited GCSE Maths Questions",
    description:
      "Endless, adaptive practice aligned with GCSE Maths standards. IC generates fresh questions on demand, targets individual gaps, and builds exam confidence without limits.",
  },
];

const WhyIC = () => {
  return (
    <section
      id="why-ic"
      className="relative overflow-hidden py-24 bg-[#f6f4ff]"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f6f4ff] via-[#ebe7ff] to-[#f6f4ff]" />
        <div className="absolute -top-40 -right-56 w-[650px] h-[650px] bg-purple-400/20 rounded-full blur-[150px]" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
            Why Choose IC?
          </h2>
          <p className="mt-4 text-2xl text-gray-600">
            Designed with neurodiverse learners in mind, IC removes barriers and
            builds confidence through intelligent, adaptive support.
          </p>
        </div>

        {/* List */}
        <div className="space-y-16">
          {points.map((point, idx) => {
            const Icon = point.icon;
            return (
              <div
                key={idx}
                className="flex flex-col md:flex-row gap-6 md:gap-10 items-start"
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center bg-purple-200 text-purple-700">
                  <Icon className="w-9 h-9" />
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {point.title}
                  </h3>
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl">
                    {point.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyIC;
