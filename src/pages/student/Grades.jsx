import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetPerformanceQuery,
  useGetAllGradesQuery,
} from "../../redux/GradeApi";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Function to calculate grade and comment
function calculateGrade(score) {
  let grade;
  let comment;
  if (score >= 90) {
    grade = 9;
    comment = "Exceptional — Keep going!";
  } else if (score >= 80) {
    grade = 8;
    comment = "Excellent work!";
  } else if (score >= 70) {
    grade = 7;
    comment = "Very good — You're improving!";
  } else if (score >= 60) {
    grade = 6;
    comment = "Good effort!";
  } else if (score >= 50) {
    grade = 5;
    comment = "Fair — Keep practicing!";
  } else if (score >= 40) {
    grade = 4;
    comment = "Below average — Try harder!";
  } else if (score >= 30) {
    grade = 3;
    comment = "Needs improvement!";
  } else if (score >= 20) {
    grade = 2;
    comment = "Very low — Don't give up!";
  } else if (score > 0) {
    grade = 1;
    comment = "Poor — Let's work on this!";
  } else {
    grade = "-";
    comment = "No attempt";
  }

  return { grade, comment };
}

export default function Grades() {
  const studentInfo = JSON.parse(localStorage.getItem("student"));
  const studentId = studentInfo?.code;

  const { data: avgData, isLoading: loadingAvg } =
    useGetPerformanceQuery(studentId);
  const { data: allData, isLoading: loadingAll } =
    useGetAllGradesQuery(studentId);

  const [filter, setFilter] = useState("7");

  if (loadingAvg || loadingAll) return <div>Loading...</div>;

  const topics = [
    "number",
    "geometry",
    "algebra",
    "probabilities",
    "statistics",
    "ratio",
  ];

  const grades = topics.map((subject) => ({
    subject,
    score: avgData?.[subject] || 0,
  }));

  // Filter scores
  const filterScores = (arr) => {
    if (!arr) return [];
    if (filter === "7") return arr.slice(-7);
    if (filter === "14") return arr.slice(-14);
    if (filter === "30") return arr.slice(-30);
    return arr; // all
  };

  return (
    <div className="p-6 bg-white min-h-[89vh]">
      <h2 className="text-2xl md:text-3xl font-bold text-[#2B3A67] mb-4 mt-2 md:mt-10 text-center">
        Your Grades
      </h2>

      {/* ============================
          AVERAGE GRADES TABLE
      ============================= */}
      <div className="overflow-x-auto shadow-lg rounded-xl w-full mb-10">
        <table className="w-full border-collapse overflow-hidden">
          <thead className="bg-green-200 text-lg md:text-xl">
            <tr>
              <th className="p-3 text-left font-semibold">Topic</th>
              <th className="p-3 md:px-14 text-left font-semibold">Grade</th>
              <th className="p-3 md:px-14 text-left font-semibold">
                Percentage
              </th>
              <th className="p-3 text-left font-semibold">Comment</th>
            </tr>
          </thead>

          <tbody>
            {grades.map(({ subject, score }) => {
              const { grade, comment } = calculateGrade(score);

              return (
                <tr
                  key={subject}
                  className="bg-green-50 border-b text-lg md:text-2xl"
                >
                  <td className="p-3 capitalize">{subject}</td>

                  <td className="p-3 md:px-14">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full font-bold text-lg md:text-2xl bg-green-200 text-green-700">
                      {grade}
                    </div>
                  </td>

                  <td className="p-3 md:px-14 text-green-600 font-medium text-xl md:text-2xl">
                    {score > 0 ? `${Math.round(score)}%` : "-"}
                  </td>

                  <td className="p-3 italic text-gray-700 text-xl md:text-2xl">
                    {score > 0 ? comment : "No grades yet"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ============================
          ALL RECORDS PER TOPIC
      ============================= */}
      <div className="mt-10 p-6 bg-gray-50 rounded-xl shadow-md">
        <h3 className="text-xl md:text-2xl font-bold text-[#2B3A67] mb-4 text-center">
          All Records Per Topic
        </h3>

        {/* ===== SCORE COLOR MAP =====
        <div className="flex flex-wrap justify-center gap-6 mb-6 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-[#16a34a]"></div>
            <span className="text-sm md:text-base">80 – 100 (Excellent)</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-[#3b82f6]"></div>
            <span className="text-sm md:text-base">60 – 79 (Good)</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-[#f97316]"></div>
            <span className="text-sm md:text-base">40 – 59 (Average)</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-[#ef4444]"></div>
            <span className="text-sm md:text-base">1 – 39 (Poor)</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-[#9ca3af]"></div>
            <span className="text-sm md:text-base">No record</span>
          </div>
        </div> */}

        {/* ===== SCORE COLOR MAP (VERTICAL - APPLE STYLE) ===== */}
        <div className="max-w-md mx-auto bg-white rounded-2xl p-6 shadow-lg border border-gray-100 space-y-5 mb-7">
          <h3 className="text-lg font-semibold text-gray-800 text-center">
            Score Guide
          </h3>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-[#16a34a]"></div>
                <span className="text-sm font-medium text-gray-700">
                  Excellent
                </span>
              </div>
              <span className="text-sm text-gray-500">80 – 100</span>
            </div>

            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-[#3b82f6]"></div>
                <span className="text-sm font-medium text-gray-700">Good</span>
              </div>
              <span className="text-sm text-gray-500">60 – 79</span>
            </div>

            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-[#f97316]"></div>
                <span className="text-sm font-medium text-gray-700">
                  Average
                </span>
              </div>
              <span className="text-sm text-gray-500">40 – 59</span>
            </div>

            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-[#ef4444]"></div>
                <span className="text-sm font-medium text-gray-700">Poor</span>
              </div>
              <span className="text-sm text-gray-500">1 – 39</span>
            </div>

            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-[#9ca3af]"></div>
                <span className="text-sm font-medium text-gray-700">
                  No record
                </span>
              </div>
              <span className="text-sm text-gray-500">--</span>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="flex justify-center gap-4 mb-6">
          {["7", "14", "30", "all"].map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm md:text-base ${
                filter === option
                  ? "bg-green-600 text-white"
                  : "bg-white border border-green-500 text-green-700"
              }`}
            >
              {option === "all" ? "All Tasks" : `Last ${option} Tasks`}
            </button>
          ))}
        </div>

        {/* Charts Section */}
        {topics.map((topic) => {
          let scores = filterScores(allData?.[topic] || []);

          // Add empty bars at the end to ensure 7 bars

          let MAX_BARS = 7; // default

          if (filter === "7") MAX_BARS = 7;
          else if (filter === "14") MAX_BARS = 14;
          else if (filter === "30") MAX_BARS = 30;
          else MAX_BARS = 7;

          if (scores.length < MAX_BARS) {
            const emptyCount = MAX_BARS - scores.length;
            scores = [...scores, ...Array(emptyCount).fill(null)];
          }

          if (scores.length < MAX_BARS) {
            const emptyCount = MAX_BARS - scores.length;
            scores = [...scores, ...Array(emptyCount).fill(null)];
          }

          const chartData = scores.map((s, i) => ({
            name: `T${i + 1}`,
            score: s !== null ? Math.round(s) : 0,
            isEmpty: s === null,
          }));

          return (
            <div key={topic} className="mb-10">
              <h4 className="text-lg md:text-xl font-semibold capitalize mb-2">
                {topic}
              </h4>

              {scores.length > 0 ? (
                <div className="w-full h-64">
                  <ResponsiveContainer>
                    <BarChart data={chartData} barCategoryGap="25%" barGap={5}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="score"
                        tickFormatter={(value) =>
                          value === 0 ? "" : `${value}`
                        }
                      />

                      <YAxis
                        domain={[0, 100]}
                        ticks={[0, 20, 40, 60, 80, 100]}
                      />

                      <Bar dataKey="score" barSize={70}>
                        {chartData.map((entry, index) => {
                          let color = "#9ca3af"; // grey for empty bars

                          if (!entry.isEmpty) {
                            if (entry.score >= 80)
                              color = "#16a34a"; // green
                            else if (entry.score >= 60)
                              color = "#3b82f6"; // blue
                            else if (entry.score >= 40)
                              color = "#f97316"; // orange
                            else color = "#ef4444"; // red
                          }

                          return <Cell key={index} fill={color} />;
                        })}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <span className="text-gray-500 italic">No records</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
