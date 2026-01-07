import { Trash2 } from "lucide-react";
import {
  useGetFeedbacksQuery,
  useDeleteFeedbackMutation,
} from "../../redux/FeedbackApi";

const Feedbacks = () => {
  const { data: feedbacks, isLoading, error } = useGetFeedbacksQuery();
  const [deleteFeedback, { isLoading: isDeleting }] =
    useDeleteFeedbackMutation();

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold text-slate-900 mb-6">
          User Feedback
        </h1>

        {/* Loading */}
        {isLoading && (
          <p className="text-slate-500 text-sm">Loading feedbacks...</p>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm">Failed to load feedbacks ❌</p>
        )}

        {/* Empty State */}
        {!isLoading && feedbacks?.length === 0 && (
          <div className="rounded-xl bg-white p-6 text-center text-slate-500 shadow">
            No feedback yet.
          </div>
        )}

        {/* Feedback List */}
        <div className="space-y-4">
          {feedbacks?.map((feedback) => (
            <div
              key={feedback._id}
              className="flex items-start justify-between gap-4 rounded-2xl bg-gray-50 p-6 shadow hover:shadow-md transition"
            >
              {/* Message */}
              <div>
                <p className="text-slate-800 text-sm leading-relaxed">
                  {feedback.message}
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  {new Date(feedback.createdAt).toLocaleString()}
                </p>
              </div>

              {/* Delete */}
              <button
                onClick={() => deleteFeedback(feedback._id)}
                disabled={isDeleting}
                className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition disabled:opacity-50"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedbacks;
