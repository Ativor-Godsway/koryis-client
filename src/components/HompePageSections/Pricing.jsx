import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import SubscribeButton from "../SubscribeButton";

const plans = [
  {
    title: "Individual Plan",
    features: [
      "Adaptive GCSE Maths assessments",
      "Personalised question flow",
      "Designed for independent learners",
    ],
    buttonText: "Get Started",
    primary: false,
  },
  {
    title: "Family Bundle",
    features: [
      "All Individual features included",
      "Manage multiple learners",
      "Free parent progress dashboard",
    ],
    buttonText: "Subscribe Now",
    primary: true,
  },
  {
    title: "School Licensing",
    features: [
      "Teacher & class dashboards",
      "Curriculum-aligned reporting",
      "Staff onboarding & support",
    ],
    buttonText: "Request Access",
    primary: false,
    isSchool: true,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="relative py-24 bg-white overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-indigo-100 rounded-full blur-[160px]" />
      <div className="absolute -bottom-32 -right-32 w-[420px] h-[420px] bg-purple-100 rounded-full blur-[160px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Designed for families, learners, and schools.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-3xl p-8 bg-white/80 backdrop-blur border transition-all duration-300
                ${
                  plan.primary
                    ? "border-indigo-300 shadow-lg scale-[1.02]"
                    : "border-gray-200 shadow-sm hover:shadow-md"
                }
              `}
            >
              {plan.isSchool && (
                <div className="absolute top-4 right-4 text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                  Schools
                </div>
              )}

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                {plan.title}
              </h3>

              <ul className="space-y-4 mb-8 text-gray-600 text-xl">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex gap-3">
                    <IoMdCheckmarkCircleOutline className="text-indigo-400 mt-1 w-5 h-5" />
                    {feat}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <Link
                to={plan.isSchool ? "/school-request" : "/register"}
                className={`block text-center rounded-full px-6 py-3 font-medium transition
                  ${
                    plan.primary
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "border border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                  }
                `}
              >
                {plan.buttonText}
              </Link>
              <SubscribeButton />
            </div>
          ))}
        </div>

        {/* Footer */}
        <p className="mt-16 text-center text-sm text-gray-500">
          Cancel anytime. No hidden fees.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
