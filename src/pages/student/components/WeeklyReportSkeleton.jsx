export const WeeklyReportSkeleton = () => {
  return (
    <div className="bg-[#F4F8FC] border border-blue-200 p-8 rounded-3xl shadow-lg space-y-8 animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-6 w-56 bg-gray-300 rounded"></div>
          <div className="h-4 w-40 bg-gray-200 rounded"></div>
        </div>
        <div className="h-10 w-36 bg-blue-200 rounded-full"></div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3"
          >
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-8 w-16 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="h-28 bg-blue-100 rounded-2xl"></div>

      {/* Tips */}
      <div className="h-28 bg-amber-100 rounded-2xl"></div>

      {/* Closing remark */}
      <div className="h-12 bg-gray-200 rounded-2xl"></div>

      {/* Button */}
      <div className="flex justify-center">
        <div className="h-12 w-52 bg-blue-300 rounded-2xl"></div>
      </div>
    </div>
  );
};
