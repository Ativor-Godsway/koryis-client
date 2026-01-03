import React from "react";
import { Check } from "lucide-react";

const dashboards = [
  {
    title: "Student Dashboard",
    accent: "blue",
    subtitle: "Your personal Maths companion",
    features: [
      "See how you're improving across topics",
      "Clear visual indicators for strengths and gaps",
      "Guidance provided with every answer",
      "Pick up exactly where you left off",
      "Questions read aloud for better focus",
      "Celebrate milestones and learning streaks",
    ],
  },
  {
    title: "Teacher Dashboard",
    accent: "green",
    subtitle: "Real-time insights to support teaching",
    features: [
      "Monitor student activity in real time",
      "Assign tasks based on topic or performance",
      "Leave personalised notes to guide progress",
      "Track mastery and misconceptions across the class",
    ],
  },
  {
    title: "Parent Dashboard",
    accent: "purple",
    subtitle: "Clear visibility into your child’s progress",
    features: [
      "View your child’s marks and progress",
      "Read feedback on performance and learning gaps",
      "Receive suggestions to support learning at home",
      "Access weekly insights and termly reports",
    ],
  },
];

const accentStyles = {
  blue: {
    title: "text-blue-900",
    dot: "bg-blue-600",
    check: "text-blue-600",
  },
  green: {
    title: "text-green-900",
    dot: "bg-green-600",
    check: "text-green-600",
  },
  purple: {
    title: "text-purple-900",
    dot: "bg-purple-600",
    check: "text-purple-600",
  },
};

const Dashboards = () => {
  return (
    <section id="dashboards" className="py-24 bg-purple-50">
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900">
            Dashboards for Everyone
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Simple, focused dashboards designed for students, supported by free,
            insight-driven dashboards for teachers and parents.
          </p>
        </div>

        <img
          src="/dashboard_overview.png"
          alt="Dashboards Overview"
          className="mb-16"
        />

        {/* Lists */}
        <div className="flex justify-between flex-col md:flex-row gap-16">
          {dashboards.map((dashboard, idx) => {
            const styles = accentStyles[dashboard.accent];

            return (
              <div key={idx} className="max-w-4xl mx-auto">
                {/* Title */}
                <div className="flex items-center gap-4 mb-4">
                  <span className={`w-3 h-3 rounded-full ${styles.dot}`}></span>
                  <h3 className={`text-3xl font-semibold ${styles.title}`}>
                    {dashboard.title}
                  </h3>
                </div>

                <p className="text-lg text-gray-600 mb-6 max-w-2xl">
                  {dashboard.subtitle}
                </p>

                {/* Features */}
                <ul className="space-y-3">
                  {dashboard.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 mt-1 ${styles.check}`} />
                      <span className="text-lg text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Dashboards;
