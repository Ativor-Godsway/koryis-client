import { useEffect, useState } from "react";
import { TTSButtons } from "./TTSButtons";
import { HiOutlineAcademicCap } from "react-icons/hi2";

export function ModalExplanation({
  show,
  question,
  correctAnswer,
  goToNextQuestion,
}) {
  const explanations = Array.isArray(question?.explanation)
    ? question.explanation
    : [];

  const [stepIndex, setStepIndex] = useState(0);

  // Reset steps when modal opens or question changes
  useEffect(() => {
    if (show) {
      setStepIndex(0);
    }
  }, [show, question?._id]);

  function normalizeSvg(svg) {
    if (!svg.startsWith("<svg")) return svg;

    return (
      svg
        // force responsive width
        .replace(
          /<svg([^>]*)>/,
          `<svg$1 width="100%" style="display:block;margin:0 auto;max-width:700px;">`,
        )
    );
  }

  function removeOuterQuotes(str) {
    if (typeof str !== "string") return str;
    if (str.startsWith('"') && str.endsWith('"')) {
      return str.slice(1, -1);
    }
    return str;
  }

  if (!show) return null;

  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === explanations.length - 1;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4 py-16 overflow-y-auto">
      <div
        id="card"
        className="bg-white w-full max-w-[800px] rounded-3xl shadow-lg border-2 border-[#DDD] p-8 space-y-8"
      >
        {/* HEADER */}
        <h2 className="text-4xl font-bold text-[#2B3A67] text-center">
          Explanation
        </h2>

        {/* STEP INDICATOR */}
        <p className="text-xl text-gray-700 text-center">
          Step {stepIndex + 1} of {explanations.length}
        </p>

        {/* QUESTION TEXT (Subtle) */}
        <div className=" text-xl text-[#555]">
          <p>{question?.question}</p>
        </div>

        {/* DIAGRAM (ALWAYS SHOWN IF EXISTS) */}
        {question?.diagram &&
          typeof question.diagram === "string" &&
          question.diagram.trim().startsWith("<svg") && (
            <div className="w-full flex justify-center">
              <div
                className="max-w-full overflow-hidden flex justify-center"
                dangerouslySetInnerHTML={{
                  __html: normalizeSvg(removeOuterQuotes(question.diagram)),
                }}
              />
            </div>
          )}

        {/* EXPLANATION TEXT (Emphasized) */}
        <div className="bg-[#F4F4F4] rounded-2xl p-6 border border-gray-300 text-2xl font-semibold text-[#333333] leading-relaxed">
          {explanations[stepIndex]}
        </div>

        {/* CORRECT ANSWER (ONLY VISIBLE ON LAST STEP) */}
        {isLastStep && (
          <div className="mt-6 bg-[#E0F7FA] rounded-2xl p-4 border-2 border-[#00ACC1] text-xl font-semibold text-[#004D40]">
            Correct Answer:{" "}
            <span className="text-[#00796B]">{correctAnswer}</span>
          </div>
        )}

        {/* NAVIGATION BUTTONS */}
        <div className="flex items-center justify-between gap-6 mt-6">
          {/* BACK BUTTON */}
          <button
            disabled={isFirstStep}
            onClick={() => setStepIndex((prev) => prev - 1)}
            className={`px-6 py-4 w-full rounded-3xl font-semibold transition 
          ${
            isFirstStep
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#E0E7FF] text-[#1E3A8A] hover:bg-[#C7D2FE]"
          }`}
          >
            Back
          </button>

          {/* NEXT BUTTON */}
          {!isLastStep && (
            <button
              onClick={() => setStepIndex((prev) => prev + 1)}
              className="px-6 py-4 w-full rounded-3xl bg-[#FFD700] hover:bg-[#FFC300] text-[#1A1A1A] font-semibold shadow-md transition"
            >
              Next Step
            </button>
          )}

          {/* NEXT QUESTION BUTTON */}
          {isLastStep && (
            <button
              onClick={goToNextQuestion}
              className="px-6 py-4 w-full rounded-3xl bg-[#00C853] hover:bg-[#00B248] text-white font-semibold shadow-md transition"
            >
              Next Question
            </button>
          )}
        </div>
        <div className="w-full flex items-center justify-center">
          {/* Speak to IC */}
          <button
            className="
      flex items-center gap-3
      bg-[#E8F1FA]
      hover:bg-[#DCEAF7]
      border border-blue-300
      text-[#2B3A67]
      font-semibold
      px-6 py-3
      rounded-2xl
      shadow-sm hover:shadow-md
      transition-all duration-300
    "
          >
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <HiOutlineAcademicCap className="text-xl" />
            </div>

            <div className="flex flex-col text-left leading-tight">
              <span className="text-sm font-medium">Speak to IC</span>
              <span className="text-xs text-gray-600">
                Ask questions • Get help
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
