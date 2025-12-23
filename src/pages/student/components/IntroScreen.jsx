import { useNavigate } from "react-router-dom";
import { TTSButtons } from "./TTSButtons";

export function IntroScreen({
  questionsData,
  onProceed,
  speakIntroduction,
  isSpeaking,
  stopTTS,
  setAutoReadEnabled,
  previousScore,
}) {
  const navigate = useNavigate();
  if (questionsData === null) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center px-6">
        <div className="bg-green-50 backdrop-blur-xl border border-green-200 shadow-xl rounded-3xl p-10 max-w-md w-full">
          <h1 className="text-2xl font-semibold text-green-900 mb-3">
            No Tasks Available
          </h1>

          <p className="text-green-900 mb-8 leading-relaxed">
            Your teacher hasn’t assigned any tasks yet. You can take a practice
            test to keep improving.
          </p>

          <button
            onClick={() => navigate("/student/student-questions")}
            className="w-full bg-green-500 text-white py-3 rounded-2xl text-lg font-medium 
                     shadow-md hover:shadow-xl hover:bg-green-600 
                     transition-all duration-200 active:scale-95"
          >
            Take Practice Test
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white p-2 text-center space-y-10">
      {previousScore && (
        <div className="flex-1 bg-gradient-to-tr from-gray-300 via-gray-200 to-gray-400 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center">
          <p className="text-gray-700 font-semibold mb-2">Previous Score</p>
          <p className="text-5xl font-bold text-gray-800">
            {Math.round(previousScore)}
          </p>
        </div>
      )}
      <h1 className="text-5xl font-bold text-[#2B3A67]">
        {questionsData.displayTopic ||
          questionsData.subTopic ||
          "Today’s Topic"}
      </h1>

      <p className="text-2xl text-[#444] max-w-3xl">
        {questionsData.introduction ||
          "Welcome! In this lesson, you will explore important concepts."}
      </p>

      <div className="bg-white shadow-xl rounded-3xl p-8 max-w-2xl w-full border border-yellow-200">
        <h2 className="text-3xl font-bold text-[#2B3A67]">
          Learning Objectives
        </h2>
        <ul className="text-left text-xl text-[#333] mt-5 space-y-3 list-disc list-inside">
          {(
            questionsData.objectives || [
              "Understand the key concepts",
              "Apply knowledge to solve problems",
              "Strengthen retention through practice",
            ]
          ).map((obj, i) => (
            <li key={i}>{obj}</li>
          ))}
        </ul>
      </div>

      <button
        onClick={onProceed}
        className="bg-green-600 hover:bg-green-700 text-white text-xl font-semibold py-4 px-10 rounded-2xl shadow-lg"
      >
        Proceed
      </button>

      <TTSButtons
        speak={speakIntroduction}
        stop={() => {
          setAutoReadEnabled(false);
          stopTTS();
        }}
        isSpeaking={isSpeaking}
      />
    </div>
  );
}
