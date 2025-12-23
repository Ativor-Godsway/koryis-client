import React from "react";
import { useNavigate } from "react-router-dom";

export const CompletedScreen = ({
  score,
  questions,
  questionsData,
  restartQuiz,
  previousScore,
  regenerateQuestion,
  refreshPage,
}) => {
  const currentScore = Math.round((score / questions.length) * 100);
  const previous =
    previousScore !== undefined ? Math.round(previousScore) : null;

  let comparisonMessage = "";
  let comparisonEmoji = "";

  const navigate = useNavigate();

  if (previous !== null) {
    if (currentScore > previous) {
      comparisonMessage = "You did better this time!";
      comparisonEmoji = "🎉";
    } else if (currentScore < previous) {
      comparisonMessage = "You scored lower than before.";
      comparisonEmoji = "⚠️";
    } else {
      comparisonMessage = "You maintained your previous score!";
      comparisonEmoji = "👍";
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      {/* Outro Message */}
      <h1 className="text-5xl font-extrabold text-[#2B3A67] mb-4">
        🎉 Lesson Completed!
      </h1>
      <p className="text-xl text-gray-700 text-center max-w-2xl mb-10">
        You have completed today’s{" "}
        <span className="font-bold">{questionsData.topic}</span> lesson. Here’s
        what you have learned:
      </p>

      {/* Learning Recap */}
      <div className="bg-white shadow-lg rounded-3xl p-6 max-w-3xl w-full mb-10">
        <h2 className="text-3xl font-bold text-[#2B3A67] mb-4 text-center">
          What You Learned
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg">
          {(
            questionsData.summary ||
            questionsData.objectives || [
              "Understand the key concepts",
              "Apply knowledge to solve problems",
              "Strengthen retention through practice",
            ]
          ).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
      {/* Score Comparison */}
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 mb-6 w-full max-w-3xl">
        {/* Previous Score Card */}
        {previous !== null && (
          <div className="flex-1 bg-gradient-to-tr from-gray-300 via-gray-200 to-gray-400 rounded-3xl shadow-lg p-5 flex flex-col items-center justify-center min-h-[150px]">
            <p className="text-gray-700 font-semibold mb-1">Previous Score</p>
            <p className="text-4xl font-bold text-gray-800">{previous}</p>
          </div>
        )}

        {/* Current Score Card */}
        <div className="flex-1 bg-gradient-to-tr from-green-400 to-blue-500 text-white rounded-3xl shadow-lg p-5 flex flex-col items-center justify-center min-h-[150px]">
          <p className="font-semibold mb-1">Current Score</p>
          <p className="text-4xl font-bold">{currentScore}</p>
        </div>
      </div>

      {/* Comparison Message */}
      {previous !== null && (
        <p className="text-2xl font-semibold text-gray-700 mb-8 flex items-center gap-2 justify-center">
          {comparisonEmoji} {comparisonMessage}
        </p>
      )}

      {/* If no previous score */}
      {previous === null && (
        <div className="mb-8 text-center">
          <p className="text-xl text-gray-700">
            You answered <span className="font-bold">{score}</span> out of{" "}
            {questions.length} correctly.
          </p>
          <p className="text-lg text-gray-600">
            Current Percentage: {currentScore}%
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={restartQuiz}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg hover:scale-105 transition-transform"
        >
          Try Again
        </button>

        {regenerateQuestion ? (
          <button
            onClick={refreshPage}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg transition-transform hover:scale-105"
          >
            Regenerate
          </button>
        ) : (
          <button
            onClick={() => navigate("/student/student-questions")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg transition-transform hover:scale-105"
          >
            Take Practice Test
          </button>
        )}
      </div>
    </div>
  );
};
