import { useState, useEffect } from "react";

const colors = [
  "bg-gradient-to-r from-blue-500 to-indigo-600",
  "bg-gradient-to-r from-green-500 to-emerald-600",
  "bg-gradient-to-r from-pink-500 to-rose-600",
  "bg-gradient-to-r from-yellow-500 to-amber-600",
];

export function QuestionDisplay({
  question,
  current,
  total,
  progressPercent,
  handleAnswer,
  fillInAnswer,
  setFillInAnswer,
  attempts,
  maxAttempts,
  remainingAttempts,
  isFillIn,
}) {
  function normalizeSvg(svg) {
    if (!svg.startsWith("<svg")) return svg;

    return (
      svg
        // force responsive width
        .replace(
          /<svg([^>]*)>/,
          `<svg$1 width="100%" style="display:block;margin:0 auto;max-width:700px;">`
        )
    );
  }

  function removeOuterQuotes(str) {
    if (str.startsWith('"') && str.endsWith('"')) {
      return str.slice(1, -1);
    }
    return str; // return original string if no outer quotes
  }

  const isLocked = remainingAttempts <= 0;
  const [wrongOption, setWrongOption] = useState(null);

  // Reset wrong option when question changes
  useEffect(() => {
    setWrongOption(null);
  }, [current]);

  // Handle option click
  const handleOptionClick = (e, option) => {
    const user = String(option).toLowerCase().trim();
    const correct = String(question.answer).toLowerCase().trim();

    if (user !== correct && remainingAttempts > 0) {
      setWrongOption(option);
    }

    handleAnswer(e, option);
  };

  return (
    <div className="flex flex-col items-center h-[89vh] bg-white p-2 md:p-6 gap-10 text-center md:pb-32 overflow-y-auto">
      {/* HEADER */}
      <div className="w-full flex flex-col items-center gap-4 pt-5">
        <h2 className="text-3xl font-bold text-[#2B3A67]">
          Question {current + 1} of {total}
        </h2>
        <div className="w-[90%] bg-gray-300 h-5 rounded-full overflow-hidden shadow-inner">
          <div
            className="bg-green-500 h-5 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p
          className={`text-lg font-semibold ${
            remainingAttempts === 1
              ? "text-yellow-600"
              : remainingAttempts === 0
              ? "text-red-600"
              : "text-gray-700"
          }`}
        >
          Attempts: {attempts} / {maxAttempts}
        </p>
      </div>

      {/* DIAGRAM PREVIEW */}
      {question.diagram &&
        typeof question.diagram === "string" &&
        question.diagram.trim().startsWith("<svg") && (
          <div className="flex justify-center items-center ">
            <div
              className="w-[90vw]  flex items-center justify-center"
              dangerouslySetInnerHTML={{
                __html: normalizeSvg(removeOuterQuotes(question.diagram)),
              }}
            />
          </div>
        )}

      {/* QUESTION */}
      <p className="text-3xl md:text-5xl font-semibold text-[#333] px-3">
        {question.question}
      </p>

      {/* FILL-IN OR MCQ */}
      {isFillIn ? (
        <form
          onSubmit={(e) => e.preventDefault()}
          className="pt-5 flex flex-col md:flex-row items-center justify-center gap-3"
        >
          <input
            type="text"
            disabled={isLocked}
            className={`border text-2xl p-3 rounded-xl  ${
              isLocked
                ? "bg-gray-200 border-gray-400 cursor-not-allowed"
                : "bg-green-100 border-green-400"
            }`}
            value={fillInAnswer}
            onChange={(e) => setFillInAnswer(e.target.value)}
          />
          <button
            type="button"
            disabled={isLocked}
            className={`p-3 px-6 rounded-xl text-white ${
              isLocked
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
            onClick={(e) => handleAnswer(e, fillInAnswer)}
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="flex flex-col md:flex-row w-full items-center justify-center gap-5 px-4">
          {question.options.map(
            (option, idx) =>
              option !== "" && (
                <button
                  key={idx}
                  type="button"
                  disabled={wrongOption === option}
                  onClick={(e) => handleOptionClick(e, option)}
                  className={`
                    max-w-[350px] w-[85%] md:w-[28%] 
                    text-white text-2xl md:text-3xl font-bold 
                    py-6 px-2 rounded-2xl shadow-xl transition-all
                    ${
                      wrongOption === option
                        ? "bg-gray-400 border-4 border-red-600 opacity-40 cursor-not-allowed"
                        : colors[idx % colors.length]
                    }
                  `}
                >
                  {option}
                </button>
              )
          )}
        </div>
      )}

      {/* WARNINGS */}
      {remainingAttempts === 1 && !isFillIn && (
        <p className="text-xl text-yellow-600 font-semibold mt-2">
          ⚠️ Last attempt!
        </p>
      )}
      {remainingAttempts === 0 && (
        <p className="text-xl text-red-600 font-semibold mt-2">
          ✖ No attempts left
        </p>
      )}
    </div>
  );
}
