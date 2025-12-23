import React from "react";

const VisionMission = () => {
  return (
    <section className="min-h-[50vh] bg-purple-50 flex items-center justify-center px-6 md:px-16 py-16">
      <div className="max-w-4xl w-full space-y-10 text-gray-700">
        {/* Page Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900">
          Koryis – Vision & Mission
        </h1>

        {/* Vision */}
        <div className="space-y-3">
          <p className="text-2xl uppercase tracking-wide font-semibold text-purple-600">
            Vision
          </p>
          <p className="text-lg md:text-xl">
            A future where more students succeed in exams through effective
            learning.
          </p>
        </div>

        {/* Mission */}
        <div className="space-y-3">
          <p className="text-2xl uppercase tracking-wide font-semibold text-purple-600">
            Mission
          </p>
          <ul className="list-disc list-inside space-y-2 text-base md:text-lg">
            <li>
              Supporting dyslexic students to prepare for GCSE Mathematics
              through personalised, adaptive assessment
            </li>
            <li>
              Helping reduce repeated GCSE Maths resits by identifying and
              addressing learning gaps early and effectively
            </li>
            <li>
              Making sure no teacher feels burnt out trying to support learners
              alone, by giving them intelligent support that gives time back
            </li>
            <li>
              Keeping parents informed and reassured through clear, meaningful
              progress updates
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
