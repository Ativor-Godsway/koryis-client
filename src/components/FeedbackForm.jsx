import { useSendFeedbackMutation } from "../redux/FeedbackApi";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const FeedbackForm = () => {
  const navigate = useNavigate();
  const [sendFeedback, { isLoading, isSuccess, error }] =
    useSendFeedbackMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    await sendFeedback({
      name: "",
      email: "",
      message: form.message.value,
    });

    form.reset();
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-4">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-black transition"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      {/* Card */}
      <div className="w-full max-w-md rounded-3xl bg-white/90 backdrop-blur-xl shadow-2xl p-8 sm:p-10">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          We’d love your feedback
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Help us improve by sharing your thoughts.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Textarea */}
          <div>
            <textarea
              name="message"
              placeholder="Write your feedback..."
              required
              className="w-full min-h-[130px] resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-2xl bg-blue-600 py-3.5 text-sm font-medium text-white shadow-md hover:bg-blue-700 hover:shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? "Sending..." : "Send Feedback"}
          </button>

          {/* Success */}
          {isSuccess && (
            <p className="text-center text-sm text-green-600">
              Thanks for your feedback 🙌
            </p>
          )}

          {/* Error */}
          {error && (
            <p className="text-center text-sm text-red-600">
              Something went wrong ❌
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;

{
  /* <input
            name="name"
            placeholder="Your name"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="email"
            type="email"
            placeholder="Email address"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> */
}
