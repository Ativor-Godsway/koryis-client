import { Trash2 } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  useGetFeedbacksQuery,
  useDeleteFeedbackMutation,
} from "../../redux/FeedbackApi";

const COLORS = ["#4f46e5", "#FF3B30"];

const Feedbacks = () => {
  const { data: feedbacks = [], isLoading, error } = useGetFeedbacksQuery();
  const [deleteFeedback] = useDeleteFeedbackMutation();

  console.log("Feedbacks:", feedbacks);

  const countBoolean = (key) => {
    const yes = feedbacks.filter((f) => f[key] === "Yes").length;
    const no = feedbacks.length - yes;
    return [
      { name: "Yes", value: yes },
      { name: "No", value: no },
    ];
  };

  const countByValue = (key) => {
    const map = {};
    feedbacks.forEach((f) => {
      if (!f[key]) return;
      map[f[key]] = (map[f[key]] || 0) + 1;
    });
    return Object.keys(map).map((k) => ({ name: k, value: map[k] }));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl space-y-10">
        <h1 className="text-3xl font-semibold text-slate-900">
          Feedback Dashboard
        </h1>

        {/* STATES */}
        {isLoading && <p className="text-slate-500">Loading feedbacks...</p>}
        {error && <p className="text-red-500">Failed to load feedbacks</p>}

        {/* ===== CHARTS ===== */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Design Rating */}
          <ChartCard title="Design Rating">
            <PieData data={countByValue("designRating")} />
          </ChartCard>

          {/* Ease of Use */}
          <ChartCard title="Ease of Use">
            <PieData data={countByValue("easeOfUse")} />
          </ChartCard>

          {/* Pricing */}
          <ChartCard title="Pricing Feedback">
            <PieData data={countByValue("pricingFeedback")} />
          </ChartCard>

          {/* Comparison Rating */}
          <ChartCard title="Comparison Rating">
            <PieData data={countByValue("comparisonRating")} />
          </ChartCard>

          {/* Onboarding Clarity */}
          <ChartCard title="Onboarding Clarity">
            <PieData data={countByValue("onboardingClarity")} />
          </ChartCard>
        </div>

        {/* ===== TEXT FEEDBACK ===== */}
        <Section title="User Comments & Suggestions">
          {feedbacks.map((f) => (
            <div
              key={f._id}
              className="rounded-xl bg-white p-6 shadow-sm space-y-3"
            >
              {f.uiImprovements && (
                <p className="text-sm text-red-600">
                  UI Improvements: {f.uiImprovements}
                </p>
              )}
              {f.finalSuggestions && (
                <p className="text-sm text-red-600">
                  Final Suggestions: {f.finalSuggestions}
                </p>
              )}
              {f.usesOtherPlatform && (
                <p className="text-sm text-red-600">
                  Uses Other Platform: {f.usesOtherPlatform}
                </p>
              )}
              {f.feltStuck && (
                <p className="text-sm text-red-600">
                  Felt Stuck: {f.feltStuck}
                </p>
              )}

              {f.continueUsing && (
                <p className="text-sm">
                  <strong>Continue Using:</strong> {f.continueUsing}
                </p>
              )}

              {f.overallExperience && (
                <p className="text-sm">
                  <strong>Overall Experience:</strong> {f.overallExperience}
                </p>
              )}

              <div className="flex justify-between items-center">
                <p className="text-xs text-slate-400">
                  {new Date(f.createdAt).toLocaleString()}
                </p>

                <button
                  onClick={() => deleteFeedback(f._id)}
                  className="text-slate-400 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </Section>
      </div>
    </div>
  );
};

export default Feedbacks;

const ChartCard = ({ title, children }) => (
  <div className="rounded-2xl bg-white p-6 shadow">
    <h3 className="mb-4 font-medium text-slate-700">{title}</h3>
    <div className="h-64">{children}</div>
  </div>
);

const PieData = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie data={data} dataKey="value" label>
        {data.map((_, i) => (
          <Cell key={i} fill={COLORS[i % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
);

const BarData = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Bar dataKey="value" fill="#4f46e5" radius={[6, 6, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
);

const Section = ({ title, children }) => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
    <div className="space-y-4">{children}</div>
  </div>
);
