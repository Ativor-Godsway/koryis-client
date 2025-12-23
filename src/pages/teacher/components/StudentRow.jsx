import { useGetPerformanceQuery } from "../../../redux/GradeApi";
import {
  calculateGCSE,
  detectWeakArea,
  formatPercent,
  safeAverage,
} from "../../../utils/teacherUtils";

export function StudentRow({
  studentId,
  onOpenNotes,
  onOpenChat,
  onOpenFull,
  onSendNote,
}) {
  // Get parent id
  const parentId = studentId.replace("S", "P");

  // Each row uses the existing hook to fetch that student's performance
  const {
    data,
    isLoading: rowLoading,
    error: rowError,
  } = useGetPerformanceQuery(studentId);

  // Map backend fields into our subject keys (support both `number` and `fractions`)
  const subjects = {
    number: data?.number ?? data?.number ?? 0,
    geometry: data?.geometry ?? 0,
    algebra: data?.algebra ?? 0,
    probabilities: data?.probabilities ?? 0,
    ratio: data?.ratio ?? 0,
    statistics: data?.statistics ?? 0,
  };

  const avg = safeAverage(Object.values(subjects));
  const gcse = calculateGCSE(avg);

  const support = detectWeakArea({
    number: subjects.number,
    geometry: subjects.geometry,
    algebra: subjects.algebra,
    probabilities: subjects.probabilities,
    ratio: subjects.ratio,
    statistics: subjects.statistics,
  });

  const supportClass =
    support === "None"
      ? "bg-green-50 text-green-700"
      : support === "Multiple Areas"
      ? "bg-red-50 text-red-700"
      : "bg-yellow-50 text-yellow-700";

  return (
    <tr className="even:bg-gray-50">
      <td className="px-4 py-3 font-medium">{studentId}</td>

      {/* show three main columns (Number, Geometry, Algebra) */}
      <td className="px-4 py-3">
        {rowLoading ? "…" : formatPercent(subjects.number)}
      </td>
      <td className="px-4 py-3">
        {rowLoading ? "…" : formatPercent(subjects.geometry)}
      </td>
      <td className="px-4 py-3">
        {rowLoading ? "…" : formatPercent(subjects.algebra)}
      </td>
      <td className="px-4 py-3">
        {rowLoading ? "…" : formatPercent(subjects.probabilities)}
      </td>
      <td className="px-4 py-3">
        {rowLoading ? "…" : formatPercent(subjects.statistics)}
      </td>
      <td className="px-4 py-3">
        {rowLoading ? "…" : formatPercent(subjects.ratio)}
      </td>

      <td className="px-4 py-3">
        <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold">
          {rowLoading ? "…" : gcse}
        </span>
      </td>

      <td className="px-4 py-3">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${supportClass}`}
        >
          {rowLoading ? "…" : support}
        </span>
      </td>

      <td className="px-4 py-3 text-center">
        <button
          onClick={() => onSendNote(studentId)}
          className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
        >
          Send Note
        </button>
      </td>

      <td className="px-4 py-3 text-center flex justify-center gap-2">
        <button
          onClick={() => onSendNote(parentId)}
          className="px-3 py-1.5 border rounded-lg text-sm hover:bg-gray-100"
        >
          Contact Parent
        </button>

        {/* <button
          onClick={() => onOpenFull(studentId, data)}
          className="px-3 py-1.5 border rounded-lg text-sm hover:bg-gray-100"
        >
          Full Performance
        </button> */}
      </td>

      {/* show possible row error */}
      {rowError && (
        <td className="px-4 py-3 text-red-500 text-sm">Error loading</td>
      )}
    </tr>
  );
}
