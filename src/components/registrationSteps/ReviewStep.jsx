import { useFormContext } from "react-hook-form";

export default function ReviewStep() {
  const { getValues } = useFormContext();
  const data = getValues();

  return (
    <div className="space-y-8">
      {/* Parent Info Card */}
      <div className="p-2 md:p-6 bg-gray-50 rounded-xl shadow-sm border">
        <h3 className="text-xl font-bold mb-4 text-gray-800">
          👤 Parent Information
        </h3>

        <div className="space-y-2 font-bold text-xl">
          <div className="flex justify-between">
            <p className="font-medium">Name:</p>
            <p>{data.parentName}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium">Email:</p>
            <p>{data.email}</p>
          </div>
        </div>
      </div>

      {/* Children List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 ">
          👧👦 Children Information
        </h3>

        {data.children.map((child, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-xl shadow-md border space-y-4 text-xl"
          >
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold text-blue-600">
                Child {index + 1}
              </h4>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                {child.firstName} {child.lastName}
              </span>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-bold">
              <Detail label="Gender" value={child.gender} />
              <Detail label="Year Group" value={child.yearGroup} />
              <Detail label="City" value={child.city} />
              <Detail label="School Type" value={child.schoolType} />

              <Detail
                label="Target Grade"
                value={child.targetGrade || "Not specified"}
              />
              <Detail label="Goal Type" value={child.goalType} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Reusable Detail Component for clean UI
function Detail({ label, value }) {
  return (
    <div className="flex justify-between p-2 bg-gray-100 rounded-lg">
      <p className="font-medium">{label}:</p>
      <p>{value}</p>
    </div>
  );
}
