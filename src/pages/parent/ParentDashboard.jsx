// ParentDashboard.jsx
import React, { useMemo } from "react";
import { jsPDF } from "jspdf";
import { useGetPerformanceQuery } from "../../redux/GradeApi";
import StudentCard from "./components/StudentCard";
import { useGetNotesQuery } from "../../redux/StudentNoteApi";
import dyslexiaFacts from "../../data/dyslexiaFacts";
import { useGetStudentQuery } from "../../redux/StudentApi";
import WeeklyReport from "../student/components/WeeklyReport";

export default function ParentDashboard() {
  const parentInfo = JSON.parse(localStorage.getItem("parent"));
  const students = parentInfo?.students || [];

  // Teacher's note
  const receiverId = parentInfo?.code;
  const { data: note } = useGetNotesQuery(receiverId);
  const teacherNote = note ? note[0] : [];

  // ----------------------------------------
  // DYSLEXIA FUN FACTS: Pick one random fact per page load
  // ----------------------------------------
  const { data: student, isLoading, error } = useGetStudentQuery(students[0]);
  const studentName = student?.firstName || "Unknown Student";

  const randomFact =
    dyslexiaFacts[Math.floor(Math.random() * dyslexiaFacts.length)];

  const displayedFact = randomFact.usesName
    ? randomFact.text.replace("{name}", studentName)
    : randomFact.text;

  // ----------------------------------------
  // UTILITIES
  // ----------------------------------------
  const getGrade = (percentage) =>
    percentage >= 90
      ? 9
      : percentage >= 80
      ? 8
      : percentage >= 70
      ? 7
      : percentage >= 60
      ? 6
      : percentage >= 50
      ? 5
      : percentage >= 40
      ? 4
      : percentage >= 30
      ? 3
      : percentage >= 20
      ? 2
      : percentage >= 1
      ? 1
      : "-";

  const getComment = (grade) => {
    switch (grade) {
      case 9:
        return "Outstanding achievement! 🌟🔥";
      case 8:
        return "Excellent work! Keep pushing higher! 💪✨";
      case 7:
        return "Great effort! You're doing really well! 👍📚";
      case 6:
        return "Good job! Stay consistent! 🙂💼";
      case 5:
        return "Nice progress. Aim for even higher! 📈😊";
      case 4:
        return "A pass. Keep practicing to improve! 📝💡";
      case 3:
        return "Below expectations. More practice will help! 📚💪";
      case 2:
        return "Struggling a bit — keep trying and ask for help! 🤝📘";
      case 1:
        return "Very weak performance. You can do better — don’t give up! 🌱🙌";
      case "-":
        return "No grades yet";
      default:
        return "";
    }
  };

  const getGradeColor = (grade) => {
    return grade === 1 || grade === 2 || grade === 3
      ? "text-amber-700 font-bold"
      : "text-black font-bold";
  };

  // ----------------------------------------
  // PDF GENERATION
  // ----------------------------------------
  const downloadPDF = (name, code, reports) => {
    try {
      if (!reports) return;

      const doc = new jsPDF("p", "mm", "a4");
      const margin = 12;
      let cursorY = 20;

      doc.setFontSize(16);
      doc.text(`Child Report - ${name}`, margin, cursorY);
      cursorY += 8;
      doc.setFontSize(12);
      doc.text(`Student ID: ${code}`, margin, cursorY);
      cursorY += 12;

      Object.entries(reports).forEach(([topic, percentage], idx) => {
        const grade = getGrade(percentage);
        const comment = getComment(grade);

        doc.text(
          `${
            idx + 1
          }. ${topic} : ${percentage}% (Grade: ${grade}) - ${comment}`,
          margin,
          cursorY
        );

        cursorY += 7;
        if (cursorY > 280) {
          doc.addPage();
          cursorY = 20;
        }
      });

      const values = Object.values(reports);
      const avg =
        values.length > 0
          ? Math.round(values.reduce((s, v) => s + v, 0) / values.length)
          : 0;

      const avgGrade = getGrade(avg);

      cursorY += 10;
      doc.text(`Average Score: ${avg}%`, margin, cursorY);
      cursorY += 6;
      doc.text(`Average Grade: ${avgGrade}`, margin, cursorY);

      doc.save(`${name.replace(/\s+/g, "_")}_Report.pdf`);
    } catch (err) {
      console.error("PDF generation error:", err);
      alert("Could not generate PDF. See console for details.");
    }
  };

  // ----------------------------------------
  // UI
  // ----------------------------------------
  if (!students.length) {
    return (
      <div className="text-center p-10 text-gray-600 text-lg">
        No students found for this parent.
      </div>
    );
  }

  const teacherId = "none";

  return (
    <div className="space-y-10 pb-10">
      {/* DID YOU KNOW / FUN FACT */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-blue-700 mb-1">
          💡 Did you know?
        </h3>
        <p className="text-gray-700 text-md">{displayedFact}</p>
      </div>

      {/* STUDENT CARDS */}
      {students.map((studentCode) => (
        <div>
          <WeeklyReport studentId={studentCode} teacherId={teacherId} />
          <StudentCard
            key={studentCode}
            studentCode={studentCode}
            getGrade={getGrade}
            getComment={getComment}
            getGradeColor={getGradeColor}
            downloadPDF={downloadPDF}
            teacherNote={teacherNote}
          />
        </div>
      ))}
    </div>
  );
}
