import { useGetPerformanceQuery } from "../../../redux/GradeApi";
import { formatTaskDate } from "../../../utils/formatDate";

export default function StudentCard({
  studentCode,
  getGrade,
  getComment,
  getGradeColor,
  downloadPDF,
  teacherNote,
}) {
  const {
    data: report,
    isLoading,
    error,
  } = useGetPerformanceQuery(studentCode);

  if (isLoading) {
    return (
      <div className="p-6 bg-blue-50 rounded-xl shadow text-center">
        Loading {studentCode}...
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="p-6 bg-red-50 rounded-xl shadow text-center text-red-600">
        Error loading performance for {studentCode}
      </div>
    );
  }

  const entries = Object.entries(report);

  // Remove topics that have 0 score
  const validEntries = entries.filter(([, val]) => val > 0);

  const average =
    validEntries.length > 0
      ? Math.round(
          validEntries
            .map(([, val]) => val)
            .reduce((sum, val) => sum + val, 0) / validEntries.length
        )
      : 0;

  const avgGrade = getGrade(average);

  return (
    <div className="bg-blue-50 rounded-2xl shadow-md border border-blue-300 overflow-auto ">
      {/* Header */}
      <div className="p-6 border-b border-blue-200">
        <h2 className="text-xl font-bold">Student Report</h2>
        <p className="text-gray-600">ID: {studentCode}</p>
      </div>

      {/* Table */}
      <div className="p-2 md:p-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-200">
              <th className="p-3 border">Topic</th>
              <th className="p-3 border">Percentage</th>
              <th className="p-3 border">Grade</th>
              <th className="p-3 border">Comment</th>
            </tr>
          </thead>

          <tbody>
            {entries.map(([topic, percentage]) => {
              const grade = getGrade(percentage);
              const comment = getComment(grade);

              return (
                <tr key={topic} className="bg-white border">
                  <td className="p-3 capitalize">{topic}</td>
                  <td className="p-3 font-semibold">
                    {percentage === 0 ? "-" : `${Math.round(percentage)}%`}
                  </td>
                  <td className={`p-3 ${getGradeColor(grade)}`}>{grade}</td>
                  <td className="p-3 text-gray-600">{comment}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Average */}
        <div className="mt-6 bg-blue-100 p-4 rounded-xl text-center">
          <p className="text-lg font-semibold">Average Performance</p>
          <p className="text-3xl font-bold mt-1">{average}%</p>
          <p className="text-gray-600">Grade: {avgGrade}</p>
        </div>

        {/* PDF */}
        <button
          onClick={() => downloadPDF("Student", studentCode, report)}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-medium"
        >
          Download Report (PDF)
        </button>
        {/* Teacher Note */}
        {teacherNote && (
          <div className="mt-8 bg-blue-50 border border-blue-200 p-5 rounded-xl">
            <h3 className="text-lg font-bold text-blue-800 mb-2">
              Teacher’s Note
            </h3>

            <p className="text-gray-700 leading-relaxed">{teacherNote.note}</p>

            <p className="text-gray-500 text-sm mt-4 italic">
              {formatTaskDate(teacherNote.createdAt)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
