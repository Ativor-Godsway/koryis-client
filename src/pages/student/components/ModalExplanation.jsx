import { useEffect, useState } from "react";
import { TTSButtons } from "./TTSButtons";

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
          `<svg$1 width="100%" style="display:block;margin:0 auto;max-width:700px;">`
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
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4 py-20 overflow-y-auto">
      <div className="bg-[#FFF7E6] w-full max-w-[720px] rounded-3xl shadow-2xl border-2 border-[#FFD700] p-6 space-y-6">
        {/* HEADER */}
        <h2 className="text-3xl font-bold text-[#2B3A67] text-center">
          Explanation
        </h2>

        {/* STEP INDICATOR */}
        <p className="text-sm text-gray-600 text-center">
          Step {stepIndex + 1} of {explanations.length}
        </p>

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

        {/* EXPLANATION TEXT */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 text-xl text-[#333333] leading-relaxed">
          {explanations[stepIndex]}
        </div>

        {/* NAVIGATION BUTTONS */}
        <div className="flex items-center justify-between gap-4 mt-4">
          <button
            disabled={isFirstStep}
            onClick={() => setStepIndex((prev) => prev - 1)}
            className={`px-5 py-3 rounded-2xl font-semibold shadow-md transition
              ${
                isFirstStep
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#E0E7FF] text-[#1E3A8A] hover:bg-[#C7D2FE]"
              }`}
          >
            Back
          </button>

          {!isLastStep && (
            <button
              onClick={() => setStepIndex((prev) => prev + 1)}
              className="px-5 py-3 rounded-2xl bg-[#FFD700] hover:bg-[#FFC300] text-[#1A1A1A] font-semibold shadow-md"
            >
              Next
            </button>
          )}

          {isLastStep && (
            <button
              onClick={goToNextQuestion}
              className="px-5 py-3 rounded-2xl bg-[#00C853] hover:bg-[#00B248] text-white font-semibold shadow-md"
            >
              Next Question
            </button>
          )}
        </div>

        {/* CORRECT ANSWER (ALWAYS VISIBLE) */}
        <div className="mt-6 bg-[#E0F7FA] rounded-2xl p-4 border-2 border-[#00ACC1] text-lg font-semibold text-[#004D40]">
          Correct Answer:{" "}
          <span className="text-[#00796B]">{correctAnswer}</span>
        </div>
      </div>
    </div>
  );
}
