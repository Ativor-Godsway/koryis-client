import React from "react";

export default function Badges({ tasksCompleted = 110 }) {
  const badges = [
    { name: "Bronze", color: "#CD7F32", threshold: 10 },
    { name: "Silver", color: "#C0C0C0", threshold: 50 },
    { name: "Gold", color: "#FFD700", threshold: 100 },
    { name: "Platinum", color: "#E5E4E2", threshold: 200 },
    { name: "Diamond", color: "#B9F2FF", threshold: 500 },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[89vh] bg-white text-center p-6 gap-12">
      {/* Section: Tasks Completed */}
      <div className="bg-[#E0F7FA] rounded-3xl p-6 shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-[#2B3A67] mb-2">
          ✅ Tasks Completed
        </h2>
        <p className="text-xl text-[#333] font-medium">
          You have completed{" "}
          <span className="font-bold text-green-600">{tasksCompleted}</span>{" "}
          tasks so far!
        </p>
      </div>

      {/* Section: Badges */}
      <h1 className="text-4xl font-bold text-[#2B3A67] mb-6">
        🏆 Your Achievements
      </h1>

      <div className="flex flex-wrap justify-center gap-8">
        {badges.map((badge, idx) => {
          const unlocked = tasksCompleted >= badge.threshold;

          return (
            <div
              key={idx}
              className={`flex flex-col items-center justify-center p-6 rounded-3xl shadow-lg w-40 h-40 transition-transform ${
                unlocked ? "scale-105" : "opacity-50"
              }`}
              style={{ backgroundColor: unlocked ? badge.color : "#E0E0E0" }}
            >
              <span
                className={`text-3xl font-extrabold ${
                  unlocked ? "text-[#1A1A1A]" : "text-gray-600"
                }`}
              >
                {badge.name}
              </span>
              <span
                className={`mt-2 text-lg font-semibold ${
                  unlocked ? "text-[#1A1A1A]" : "text-gray-600"
                }`}
              >
                {badge.threshold} tasks
              </span>
              {unlocked && (
                <span className="mt-1 text-md font-medium text-green-700">
                  🎉 Unlocked!
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
