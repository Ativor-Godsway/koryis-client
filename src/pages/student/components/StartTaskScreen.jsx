import React, { useState } from "react";

const topics = [
  "Algebra",
  "Geometry",
  "Number",
  "Ratio",
  "Probability",
  "Statistics",
];

const StartTaskScreen = ({ totalQuestions = 10, level = 1, onStart }) => {
  const [selectedTopic, setSelectedTopic] = useState("");

  const handleStart = () => {
    if (!selectedTopic) return;
    onStart(selectedTopic);
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center relative overflow-hidden px-4">
      {/* Floating background shapes */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full blur-xl animate-pulse hidden md:flex"></div>
      <div className="absolute top-20 right-16 w-40 h-24 bg-purple-200 rounded-full blur-xl animate-pulse hidden md:flex"></div>
      <div className="absolute bottom-24 left-20 w-28 h-28 bg-green-200 rounded-full blur-xl animate-pulse hidden md:flex"></div>

      {/* Game Title */}
      <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-6">
        Today's Task
      </h1>

      {/* Sub text */}
      <p className="text-gray-600 max-w-lg mb-8 text-lg">
        Choose a topic and test your brain power. Every correct answer levels
        you up! 🚀
      </p>

      {/* Topic Selection */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10 max-w-xl w-full">
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => setSelectedTopic(topic)}
            className={`py-3 px-4 rounded-xl border-2 font-semibold transition-all
              ${
                selectedTopic === topic
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent scale-105"
                  : "bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:scale-105"
              }`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Start Button */}
      <button
        onClick={handleStart}
        disabled={!selectedTopic}
        className={`px-12 py-5 rounded-full text-2xl font-bold tracking-wide shadow-xl transition-all
        ${
          selectedTopic
            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-110"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        ▶ START TASK
      </button>

      {/* Tip */}
      <p className="text-sm text-gray-400 mt-6">
        Tip 💡: Pick your strongest topic or challenge yourself!
      </p>
    </div>
  );
};

export default StartTaskScreen;
