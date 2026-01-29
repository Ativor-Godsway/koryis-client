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

  const feltStuck = watch("feltStuck");
  const usesOtherPlatform = watch("usesOtherPlatform");

  const onSubmit = async (data) => {
    await sendFeedback(data).unwrap();
    reset();
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-sm text-slate-500 hover:text-slate-700"
        >
          ← Back
        </button>

        <div className="rounded-2xl bg-white border border-slate-200 p-8">
          <h2 className="text-2xl font-semibold text-slate-900">
            IC User Feedback
          </h2>
          <p className="text-sm text-slate-500 mb-10">
            Your feedback helps us improve the learning experience.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
            {/* SECTION 1 */}
            <Section title="Section 1: Ease of Use & Onboarding">
              <Question title="1. How easy was it to start using IC?">
                <RadioGroup
                  name="easeOfUse"
                  options={[
                    "Very easy",
                    "Easy",
                    "Neutral",
                    "Difficult",
                    "Very difficult",
                  ]}
                  register={register}
                  error={errors.easeOfUse}
                />
              </Question>

              <Question title="2. How clear was the onboarding process?">
                <RadioGroup
                  name="onboardingClarity"
                  options={[
                    "Very clear",
                    "Clear",
                    "Neutral",
                    "Unclear",
                    "Very unclear",
                  ]}
                  register={register}
                  error={errors.onboardingClarity}
                />
              </Question>
            </Section>

            {/* SECTION 2 */}
            <Section title="Section 2: Platform Experience & User Flow">
              <Question title="3. How smooth was the overall platform flow?">
                <RadioGroup
                  name="platformFlow"
                  options={[
                    "Very smooth",
                    "Smooth",
                    "Neutral",
                    "Confusing",
                    "Very confusing",
                  ]}
                  register={register}
                  error={errors.platformFlow}
                />
              </Question>

              <Question title="4. Were there moments you felt stuck or unsure?">
                <YesNo
                  name="feltStuck"
                  register={register}
                  error={errors.feltStuck}
                />
                {feltStuck === "yes" && (
                  <Textarea
                    placeholder="Please explain where this happened..."
                    {...register("stuckReason", { required: true })}
                  />
                )}
              </Question>
            </Section>

            {/* SECTION 3 */}
            <Section title="Section 3: UI / Design Feedback">
              <Question title="5. How would you rate the overall design of IC?">
                <RadioGroup
                  name="designRating"
                  options={["Excellent", "Good", "Fair", "Poor"]}
                  register={register}
                  error={errors.designRating}
                />
              </Question>

              <Question title="6. Was the interface supportive for a dyslexic learner?">
                <RadioGroup
                  name="dyslexiaSupport"
                  options={[
                    "Yes, very supportive",
                    "Somewhat supportive",
                    "Neutral",
                    "Not supportive",
                  ]}
                  register={register}
                  error={errors.dyslexiaSupport}
                />
              </Question>

              <Question title="7. What UI or design improvements would you suggest?">
                <Textarea
                  placeholder="Fonts, colours, layout, spacing, etc."
                  {...register("uiImprovements")}
                />
              </Question>
            </Section>

            {/* SECTION 5 */}
            <Section title="Section 5: Comparison & Value">
              <Question title="10. Do you use another similar platform?">
                <YesNo
                  name="usesOtherPlatform"
                  register={register}
                  error={errors.usesOtherPlatform}
                />
                {usesOtherPlatform === "yes" && (
                  <Textarea
                    placeholder="Please name the platform"
                    {...register("otherPlatformName", { required: true })}
                  />
                )}
              </Question>

              <Question title="11. Compared to other tools, how would you rate IC?">
                <RadioGroup
                  name="comparisonRating"
                  options={["Much better", "Better", "About the same", "Worse"]}
                  register={register}
                  error={errors.comparisonRating}
                />
              </Question>
            </Section>

            {/* SECTION 6 */}
            <Section title="Section 6: Continuation & Pricing (Parents Only)">
              <Question title="12. Would you want your child to continue using IC?">
                <Textarea
                  placeholder="Why or why not?"
                  {...register("continueUsing")}
                />
              </Question>

              <Question title="13. What monthly price feels reasonable (£)?">
                <Textarea
                  placeholder="e.g. £10–£15 per month"
                  {...register("pricingFeedback")}
                />
              </Question>
            </Section>

            {/* SECTION 7 */}
            <Section title="Section 7: Overall Feedback">
              <Question title="14. What is your overall experience using IC?">
                <Textarea {...register("overallExperience")} />
              </Question>

              <Question title="15. What would you like us to add, remove, or improve?">
                <Textarea {...register("finalSuggestions")} />
              </Question>
            </Section>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-indigo-600 py-3 text-white font-medium hover:bg-indigo-700 disabled:opacity-60"
            >
              {isSubmitting ? "Submitting…" : "Submit Feedback"}
            </button>
          </form>
        </div>
      </div>

      {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
    </div>
  );
}

/* ---------- UI Components ---------- */

const Section = ({ title, children }) => (
  <div className="space-y-8">
    <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
    {children}
  </div>
);

const Question = ({ title, children }) => (
  <div className="space-y-4">
    <p className="font-medium text-slate-800">{title}</p>
    {children}
  </div>
);

const RadioGroup = ({ name, options, register, error }) => (
  <>
    {options.map((opt) => (
      <label key={opt} className="flex items-center gap-3">
        <input
          type="radio"
          value={opt}
          className="accent-indigo-600"
          {...register(name, { required: "This field is required" })}
        />
        {opt}
      </label>
    ))}
    {error && <Error>{error.message}</Error>}
  </>
);

const YesNo = ({ name, register, error }) => (
  <>
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
  </>
);

const Textarea = (props) => (
  <textarea
    className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-indigo-500"
    rows={3}
    {...props}
  />
);

const Error = ({ children }) => (
  <p className="text-sm text-red-500">{children}</p>
);

const SuccessModal = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 text-center">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-slate-400"
      >
        ✕
      </button>
      <h3 className="text-lg font-semibold">Feedback Submitted</h3>
      <p className="mt-2 text-sm text-slate-500">
        Thank you for helping us improve IC.
      </p>
    </div>
  </div>
);
