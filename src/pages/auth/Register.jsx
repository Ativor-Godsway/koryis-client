import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import ParentStep from "../../components/registrationSteps/ParentStep.jsx";
import ChildStep from "../../components/registrationSteps/StudentStep.jsx";
import ReviewStep from "../../components/registrationSteps/ReviewStep.jsx";
import { registerParent } from "../../services/auth.js";
import { login } from "../../services/auth.js";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const steps = ["Parent Info", "Child Info", "Review & Submit"];

export default function WizardForm() {
  const [successData, setSuccessData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const methods = useForm({
    mode: "onSubmit",
    defaultValues: {
      parentName: "",
      email: "",
      password: "",
      confirmPassword: "",
      children: [
        {
          firstName: "",
          lastName: "",
          gender: "",
          yearGroup: "",
          city: "",
          schoolType: "",
          targetGrade: "",
          goalType: "",
        },
      ],
    },
  });

  const { trigger, getValues } = methods;

  const [currentStep, setCurrentStep] = useState(0);

  // Validate current step before moving next
  const nextStep = async () => {
    let valid = false;

    if (currentStep === 0) {
      valid = await trigger([
        "parentName",
        "email",
        "password",
        "confirmPassword",
      ]);
    } else if (currentStep === 1) {
      const children = getValues("children");
      const childFields = children.flatMap((_, index) => [
        `children.${index}.firstName`,
        `children.${index}.lastName`,
        `children.${index}.gender`,
        `children.${index}.yearGroup`,
        `children.${index}.city`,
        `children.${index}.schoolType`,
        `children.${index}.readingPreference`,
        `children.${index}.fontPreference`,
        `children.${index}.goalType`,
      ]);
      valid = await trigger(childFields);
    } else {
      valid = true;
    }

    if (valid) setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    setSuccessData(null);

    try {
      const response = await registerParent({
        parentName: data.parentName,
        email: data.email,
        password: data.password,
        children: data.children,
      });
      setSuccessData(response);
      setPassword(data.password);
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleParentLogin = async () => {
    const code = successData.parentCode;
    setError("");

    try {
      const res = await login({ code, password });
      setSuccessData(null);
      navigate(
        res.role === "student" ? "/student/dashboard" : "/parent/dashboard"
      );
    } catch (err) {
      setError(err.message || "Error logging in as parent");
    }
  };

  const handleStudentLogin = async () => {
    const code = successData.studentCodes[0].code;
    setError("");

    try {
      const res = await login({ code, password });
      setSuccessData(null);
      navigate(
        res.role === "student" ? "/student/dashboard" : "/parent/dashboard"
      );
    } catch (err) {
      setError(err.message || "Error logging in as student");
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12
  bg-gradient-to-br from-indigo-200 via-purple-100 to-pink-100 relative overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 -right-24 w-96 h-96 bg-indigo-300 rounded-full blur-3xl opacity-30" />

      <FormProvider {...methods}>
        {/* Progress Bar */}
        <div className="w-full max-w-4xl mb-12 relative z-10">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500"
              style={{
                width: `${(currentStep / (steps.length - 1)) * 100}%`,
              }}
            />
          </div>

          {/* Step Indicators */}
          <div className="absolute -top-3 left-0 w-full flex justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center ">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full border-2 text-sm font-bold transition-all
              ${
                currentStep >= index
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-white border-gray-300 text-gray-400"
              }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`mt-2 text-xs md:text-sm text-center
              ${
                currentStep >= index
                  ? "text-blue-600 font-semibold"
                  : "text-gray-400"
              }`}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <form
          onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          className="relative z-10 w-full max-w-4xl mx-auto
      p-6 md:p-10 bg-white backdrop-blur-xl
      rounded-3xl shadow-2xl border border-white"
        >
          <Link to={"/"} className="w-full flex items-center justify-center">
            <img
              src="/favicon-koryis.png"
              alt="Koryis Logo"
              className="w-16 "
            />
          </Link>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
            {steps[currentStep]}
          </h2>

          {/* Steps */}
          {currentStep === 0 && <ParentStep />}
          {currentStep === 1 && <ChildStep />}
          {currentStep === 2 && <ReviewStep />}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-10">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 font-medium transition"
              >
                ← Back
              </button>
            )}

            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto px-8 py-3 rounded-xl
            bg-gradient-to-r from-blue-500 to-indigo-600
            text-white font-semibold shadow-lg
            hover:scale-[1.02] transition"
              >
                Next →
              </button>
            ) : (
              <button
                type="button"
                onClick={methods.handleSubmit(onSubmit)}
                className="ml-auto px-8 py-3 rounded-xl
            bg-gradient-to-r from-green-500 to-emerald-600
            text-white font-semibold shadow-lg
            hover:scale-[1.02] transition"
              >
                {loading ? "Registering..." : "Complete Registration"}
              </button>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 rounded-xl bg-red-50 text-red-600 text-sm border border-red-200">
              {error}
            </div>
          )}
        </form>
      </FormProvider>

      {/* Success Modal */}
      {successData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-[90%] max-w-md text-center space-y-6">
            <h2 className="text-3xl font-bold text-green-600">
              🎉 Registration Successful
            </h2>

            <p className="text-gray-600">
              Please save these access codes for future login.
            </p>

            <div className="bg-green-50 p-4 rounded-2xl text-left space-y-3">
              <p>
                <span className="font-semibold">Parent Code:</span>{" "}
                <span className="font-mono text-green-700">
                  {successData.parentCode}
                </span>
              </p>

              <div>
                <p className="font-semibold mb-2">Student Codes:</p>
                <ul className="space-y-1">
                  {successData.studentCodes.map((student, i) => (
                    <li key={i} className="font-mono text-blue-600">
                      {student.name}: {student.code}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleStudentLogin}
                className="flex-1 py-3 rounded-xl bg-blue-100 hover:bg-blue-200 font-semibold transition"
              >
                Student Login
              </button>
              <button
                onClick={handleParentLogin}
                className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
              >
                Parent Login
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
