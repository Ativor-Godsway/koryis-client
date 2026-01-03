import React from "react";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useGetReportQuery } from "../../../redux/WeeklyReport";
import { calculateGrade } from "../../../utils/calculateGrade";
import { WeeklyReportSkeleton } from "./WeeklyReportSkeleton";

const getWeekEndingDate = () => {
  const today = new Date();
  const day = today.getDay(); // 0 = Sun, 5 = Fri

  // Find Friday of this week
  const diffToFriday = 5 - day;
  const friday = new Date(today);
  friday.setDate(today.getDate() + diffToFriday);

  return friday.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const WeeklyReport = ({ studentId, teacherId }) => {
  const { data: report, isLoading } = useGetReportQuery(studentId);
  const weeklyReport = report?.report;

  const { grade } = calculateGrade(weeklyReport?.averageScore || 0);
  const navigate = useNavigate();

  const weekEnding = getWeekEndingDate();

  if (isLoading) {
    return <WeeklyReportSkeleton />;
  }

  if (!report?.report) {
    return null;
  }

  return (
    <div className="bg-[#F4F8FC] border border-blue-200 p-8 rounded-3xl shadow-lg space-y-8 mb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-[#2B3A67]">
            Weekly Learning Report
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Week Ending • <span className="font-medium">{weekEnding}</span>
          </p>
        </div>

        <div className="flex items-center gap-3 bg-blue-100 px-5 py-2 rounded-full border border-blue-300">
          <HiOutlineAcademicCap className="text-blue-600 text-xl" />
          <span className="text-blue-900 font-semibold text-sm">
            Academic Summary
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Tasks Completed" value={weeklyReport.tasksCompleted} />
        <StatCard label="Average Grade" value={grade} />
        <StatCard
          label="Average Score"
          value={`${weeklyReport.averageScore}%`}
        />
      </div>

      {/* Performance Summary */}
      <div className="bg-blue-50 border-l-8 border-blue-500 p-6 rounded-2xl shadow-sm text-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          📊 Performance Summary
        </h3>
        <p className="text-blue-900 leading-relaxed">
          {weeklyReport.performanceSummary}
        </p>
      </div>

      {/* Improvement Tips */}
      <div className="bg-amber-50 border-l-8 border-amber-500 p-6 rounded-2xl shadow-sm">
        <h3 className="text-lg font-semibold text-amber-900 mb-2">
          🚀 Improvement Tips
        </h3>
        <p className="text-amber-900 leading-relaxed text-lg">
          {weeklyReport.improvementTips}
        </p>
      </div>

      {/* Closing Remark */}
      <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm text-center">
        <p className="text-lg font-medium text-gray-700">
          {weeklyReport.closingRemark}
        </p>
      </div>

      {teacherId != "none" && (
        <div className="flex justify-center">
          <button
            onClick={() =>
              navigate(
                teacherId ? "/student/tasks" : "/student/student-questions"
              )
            }
            className="bg-blue-600 text-white hover:bg-blue-700 transition-all text-lg font-semibold py-3 px-10 rounded-2xl shadow-lg"
          >
            Start Today’s Tasks
          </button>
        </div>
      )}
    </div>
  );
};

/* ---------------- Small Reusable Card ---------------- */
const StatCard = ({ label, value }) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm text-center">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-3xl font-bold text-[#2B3A67] mt-1">{value}</p>
  </div>
);

export default WeeklyReport;
