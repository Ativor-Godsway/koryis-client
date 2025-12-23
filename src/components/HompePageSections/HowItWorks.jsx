import React from "react";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { RefreshCcw, TrendingUp, Clock } from "lucide-react";

const steps = [
  {
    icon: LiaChalkboardTeacherSolid,
    title: "Teacher Delivers the Lesson",
    description:
      "While teachers inspire and guide, IC handles the heavy lifting, continuously assessing learners’ understanding with smart, adaptive questions that respond to each student’s pace, strengths, and gaps.",
  },
  {
    icon: RefreshCcw,
    title: "IC Learns & Adapts",
    description:
      "Every student response helps IC refine questions in real time, creating a personalised learning journey that builds confidence and mastery, without teachers spending hours marking.",
  },
  {
    icon: TrendingUp,
    title: "Students Shine",
    description:
      "With targeted feedback and tailored practice through unlimited Maths questions, students gain the confidence, skills, and preparation they need to excel in GCSE Maths.",
  },
  {
    icon: Clock,
    title: "Empowering Teachers",
    description:
      "IC frees teachers from repetitive Maths assessments and marking, giving them back precious time to do what they love most, truly teaching and inspiring the next generation.",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="relative py-24 bg-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
            How IC Works
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            IC fits naturally into the classroom, enhancing learning without
            disrupting teaching.
          </p>
        </div>

        {/* List */}
        <div className="space-y-14">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="flex flex-col md:flex-row gap-6 md:gap-10 items-start"
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center bg-purple-100 text-purple-700">
                  <Icon className="w-9 h-9" />
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                    {step.description}
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

export default HowItWorks;
