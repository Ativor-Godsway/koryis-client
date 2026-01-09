import { useForm } from "react-hook-form";
import { useSendFeedbackMutation } from "../redux/FeedbackApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function FeedbackForm() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [sendFeedback] = useSendFeedbackMutation();

  const easeOfUse = watch("easeOfUse");
  const supportiveAndClear = watch("supportiveAndClear");
  const voiceHelpedFocus = watch("voiceHelpedFocus");
  const confidenceOrGaps = watch("confidenceOrGaps");

  const onSubmit = async (data) => {
    await sendFeedback({
      ...data,
      supportiveAndClear: data.supportiveAndClear === "yes",
      voiceHelpedFocus: data.voiceHelpedFocus === "yes",
      confidenceOrGaps: data.confidenceOrGaps === "yes",
    }).unwrap();

    reset();
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-sm text-slate-500 hover:text-slate-700 transition"
        >
          ← Back
        </button>

        {/* Card */}
        <div className="rounded-2xl bg-white border border-slate-200 p-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-1">
            IC Feedback
          </h2>
          <p className="text-sm text-slate-500 mb-8">
            Help us improve your experience
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            {/* Q1 */}
            <Question title="1. How easy was it to use IC?">
              {["Very easy", "Easy", "Difficult"].map((option) => (
                <Radio
                  key={option}
                  label={option}
                  value={option}
                  {...register("easeOfUse", {
                    required: "Please select an option",
                  })}
                />
              ))}
              {errors.easeOfUse && <Error>{errors.easeOfUse.message}</Error>}

              {easeOfUse === "Difficult" && (
                <Textarea
                  placeholder="What made it difficult?"
                  {...register("easeOfUseReason", {
                    required: "Please explain the difficulty",
                  })}
                />
              )}
            </Question>

            {/* Q2 */}
            <YesNoQuestion
              title="2. Did IC feel supportive and clear during the Maths questions?"
              register={register}
              name="supportiveAndClear"
              error={errors.supportiveAndClear}
            />
            {supportiveAndClear === "no" && (
              <Textarea
                placeholder="Please explain why"
                {...register("supportiveReason", { required: true })}
              />
            )}

            {/* Q3 */}
            <YesNoQuestion
              title="3. Did the voice interaction help your child stay focused?"
              register={register}
              name="voiceHelpedFocus"
              error={errors.voiceHelpedFocus}
            />
            {voiceHelpedFocus === "no" && (
              <Textarea
                placeholder="Please explain why"
                {...register("voiceReason", { required: true })}
              />
            )}

            {/* Q4 */}
            <YesNoQuestion
              title="4. Did IC help identify learning gaps or build confidence?"
              register={register}
              name="confidenceOrGaps"
              error={errors.confidenceOrGaps}
            />
            {confidenceOrGaps === "no" && (
              <Textarea
                placeholder="Please explain why"
                {...register("confidenceReason", { required: true })}
              />
            )}

            {/* Q5 */}
            <div className="space-y-2">
              <label className="font-medium text-slate-800">
                5. Would you want your child to continue using IC? Why or why
                not?
              </label>
              <Textarea
                placeholder="Share your thoughts or experience..."
                {...register("continueUsing")}
              />
            </div>

            {/* Q6 */}
            <div className="space-y-2">
              <label className="font-medium text-slate-800">
                6. What is one thing you would improve or change?
              </label>
              <Textarea
                placeholder="Tell us what we could do better..."
                {...register("improvementSuggestion")}
              />
            </div>

            {/* Q7 */}
            <Question title="7. What price range feels reasonable? (Parent only)">
              {[
                " £9.99 - £14.99 ",
                "£14.99 - 19.99 ",
                "£19.99 - £24.99",
                "Above",
              ].map((price) => (
                <Radio
                  key={price}
                  label={price}
                  value={price}
                  {...register("pricingRange")}
                />
              ))}
            </Question>

            {/* Q8 */}
            <div className="space-y-2">
              <label className="font-medium text-slate-800">
                8. Overall experience — what should we add or remove?
              </label>
              <Textarea
                placeholder="Tell us anything else you'd like us to know..."
                {...register("overallExperience")}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-indigo-600 py-3 text-white font-medium hover:bg-indigo-700 transition disabled:opacity-60"
            >
              {isSubmitting ? "Submitting…" : "Submit Feedback"}
            </button>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 text-center">
            {/* Close (X) Button */}
            <button
              onClick={() => setShowSuccess(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition"
              aria-label="Close"
            >
              ✕
            </button>

            <h3 className="text-lg font-semibold text-slate-900">
              Feedback Submitted
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Thank you for helping us improve IC.
            </p>

            <div className="mt-6">
              <button
                onClick={() => navigate(-1)}
                className="w-full rounded-xl bg-indigo-600 py-2 text-white hover:bg-indigo-700 transition"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const Question = ({ title, children }) => (
  <div className="space-y-4">
    <p className="font-medium text-slate-800">{title}</p>
    {children}
  </div>
);

const Radio = ({ label, ...props }) => (
  <label className="flex items-center gap-3 text-slate-700">
    <input type="radio" className="accent-indigo-600" {...props} />
    {label}
  </label>
);

const Textarea = (props) => (
  <textarea
    className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
    {...props}
  />
);

const Error = ({ children }) => (
  <p className="text-sm text-red-500">{children}</p>
);

const YesNoQuestion = ({ title, register, name, error }) => (
  <Question title={title}>
    <div className="flex gap-6">
      {["yes", "no"].map((val) => (
        <label key={val} className="flex items-center gap-2 capitalize">
          <input
            type="radio"
            value={val}
            className="accent-indigo-600"
            {...register(name, { required: "This field is required" })}
          />
          {val}
        </label>
      ))}
    </div>
    {error && <Error>{error.message}</Error>}
  </Question>
);
