import {
  calculateGCSE,
  detectWeakArea,
  formatPercent,
  safeAverage,
} from "../../../utils/teacherUtils";

export function FullPerformanceModal({ studentId, data, onClose }) {
  if (!data) return null;

  const subjectMap = {
    Number: data.number ?? data.number ?? 0,
    Geometry: data.geometry ?? 0,
    Algebra: data.algebra ?? 0,
    Probabilities: data.probabilities ?? 0,
    Ratio: data.ratio ?? 0,
    Statistics: data.statistics ?? 0,
  };

  const avg = safeAverage(Object.values(subjectMap));
  const gcse = calculateGCSE(avg);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            Full Performance — {studentId}
          </h3>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-md text-sm bg-gray-100"
            aria-label="Close"
          >
            Close
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold">
              GCSE {gcse}
            </div>
            <div className="text-sm text-gray-600">
              Average: {avg.toFixed(1)}%
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {Object.entries(subjectMap).map(([name, val]) => (
              <div
                key={name}
                className="p-3 border rounded-md flex items-center justify-between"
              >
                <div className="text-sm text-gray-700">{name}</div>
                <div className="text-sm font-medium">{formatPercent(val)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
