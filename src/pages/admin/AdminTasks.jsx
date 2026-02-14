import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetAllTasksQuery } from "../../redux/TaskApi";

/* YEARS 7 → 13 */
const YEARS = Array.from({ length: 7 }, (_, i) => i + 7);

/* DIFFICULTIES */
const DIFFICULTIES = ["easy", "medium", "hard"];

/* TOPICS + SUBTOPICS */
const topics = {
  number: [
    "Structure and calculation",
    "Fractions, decimals, percentages",
    "Measures and accuracy",
  ],
  algebra: [
    "Notation and manipulation",
    "Equations and inequalities",
    "Sequences",
    "Graphs",
  ],
  ratio: [
    "Unit conversions (simple and compound)",
    "Scale diagrams and maps",
    "Ratios and fractions",
    "Growth and decay (compound interest, iterative processes)",
    "Average/instantaneous rates of change",
  ],
  geometry: ["Properties and constructions", "Mensuration", "Vectors"],
  probabilities: [
    "Recording and analysing outcomes",
    "Mutually exclusive and exhaustive events",
    "Probability tables, Venn diagrams, grids, trees",
    "Independent and dependent events",
    "Conditional probability",
  ],
  statistics: [
    "Sampling methods and limitations",
    "Tables, charts and diagrams",
    "Data representation (histograms, cumulative frequency)",
    "Describing distributions (mean, median, mode, range, quartiles, IQR)",
    "Scatter graphs, correlation, lines of best fit",
  ],
};

/* 🔥 GROUP TASK SETS (each task = 1 set) */
const groupTasks = (tasks = []) => {
  const result = {};

  tasks.forEach((task) => {
    const topic = task.topic?.toLowerCase();
    const sub = task.subTopic;
    const difficulty = task.difficulty?.toLowerCase();
    const year = Number(task.yearGroup?.replace("Year ", ""));

    if (!year || !topic || !sub || !difficulty) return;

    if (!result[year]) result[year] = {};
    if (!result[year][topic]) result[year][topic] = {};
    if (!result[year][topic][sub])
      result[year][topic][sub] = { easy: 0, medium: 0, hard: 0 };

    // each task counts as ONE set
    result[year][topic][sub][difficulty] += 1;
  });

  return result;
};

export default function AdminTasks() {
  const [year, setYear] = useState(7);

  const { data, isLoading, isError, refetch } = useGetAllTasksQuery();

  /* 🔁 REFRESH WHEN PAGE IS VISITED AGAIN */
  useEffect(() => {
    refetch();

    const handleFocus = () => {
      refetch();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [refetch]);

  const groupedData = useMemo(() => groupTasks(data?.tasks), [data]);
  const yearData = groupedData?.[year] || {};

  if (isLoading) return <div className="p-8">Loading tasks...</div>;
  if (isError)
    return <div className="p-8 text-red-500">Error loading tasks</div>;

  return (
    <div className="p-8 space-y-10">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">
          Question Bank Overview
        </h1>

        <Link
          to="/admin/add-task"
          className="px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
        >
          + Create New Task
        </Link>
      </div>

      {/* YEAR SELECTOR */}
      <div className="flex flex-wrap gap-3">
        {YEARS.map((y) => (
          <button
            key={y}
            onClick={() => setYear(y)}
            className={`px-5 py-2 rounded-xl font-semibold transition ${
              y === year
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Year {y}
          </button>
        ))}
      </div>

      {/* TOPICS */}
      {Object.entries(topics).map(([topic, subtopics]) => (
        <div key={topic} className="bg-white rounded-2xl border shadow-sm p-6">
          <h2 className="text-2xl font-semibold capitalize mb-4">{topic}</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-gray-600">
                  <th className="p-3 text-left">Subtopic</th>
                  <th className="p-3 text-center">Easy</th>
                  <th className="p-3 text-center">Medium</th>
                  <th className="p-3 text-center">Hard</th>
                </tr>
              </thead>

              <tbody>
                {subtopics.map((subtopic) => {
                  const counts = yearData?.[topic]?.[subtopic] || {
                    easy: 0,
                    medium: 0,
                    hard: 0,
                  };

                  return (
                    <tr key={subtopic} className="border-t">
                      <td className="p-3 font-medium text-gray-700">
                        {subtopic}
                      </td>

                      {DIFFICULTIES.map((level) => (
                        <td key={level} className="p-3 text-center">
                          <Badge value={counts[level]} />
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

/* BADGE */
const Badge = ({ value }) => {
  const color =
    value === 0
      ? "bg-gray-200 text-gray-600"
      : value < 5
        ? "bg-yellow-200 text-yellow-800"
        : "bg-green-200 text-green-800";

  return (
    <span
      className={`inline-flex items-center justify-center w-12 py-1 rounded-full text-sm font-semibold tabular-nums ${color}`}
    >
      {value}
    </span>
  );
};
