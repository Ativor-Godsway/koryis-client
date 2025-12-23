import {
  useGetRequestsQuery,
  useUpdateRequestStatusMutation,
} from "../../redux/SchoolRequestApi";
import { capitalizeFirstLetter } from "../../utils/capitalize";
import { formatTaskDate } from "../../utils/formatDate";

export default function Requests() {
  // Fetch requests from backend
  const { data, isLoading, isError } = useGetRequestsQuery();
  const requests = data?.data || [];

  // Mutation to update request status
  const [updateStatus] = useUpdateRequestStatusMutation();

  const handleApprove = async (id) => {
    try {
      await updateStatus({ id, status: "complete" }).unwrap();
    } catch (err) {
      console.error("Failed to approve request:", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await updateStatus({ id, status: "cancelled" }).unwrap();
    } catch (err) {
      console.error("Failed to reject request:", err);
    }
  };

  const getStatusBadge = (status) => {
    if (status === "pending")
      return (
        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium">
          Pending
        </span>
      );
    if (status === "complete")
      return (
        <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
          Completed
        </span>
      );
    if (status === "cancelled")
      return (
        <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm font-medium">
          Cancelled
        </span>
      );
  };

  if (isLoading) return <p className="p-6">Loading requests...</p>;
  if (isError)
    return <p className="p-6 text-red-600">Failed to load requests</p>;

  return (
    <div className="p-1 md:p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        School Access Requests
      </h1>

      <div className="grid gap-6">
        {requests.map((req) => (
          <div
            key={req._id}
            className="bg-white p-6 rounded-2xl shadow border border-gray-200 flex flex-col md:flex-row justify-between gap-6"
          >
            {/* Left Column */}
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {req.schoolName} ({capitalizeFirstLetter(req.schoolType)})
                </h2>
                <p className="text-gray-500 text-sm">
                  {req.schoolAddress} | {req.postcode}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Students</p>
                  <p className="text-gray-800">{req.studentCount}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Teachers</p>
                  <p className="text-gray-800">{req.teacherCount}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Age Range</p>
                  <p className="text-gray-800">{req.ageRange}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Local Authority</p>
                  <p className="text-gray-800">{req.localAuthority}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Sent At</p>
                  <p className="text-gray-800">
                    {formatTaskDate(req.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex-1 flex flex-col justify-between space-y-4">
              <div>
                <p className="text-gray-500 text-sm">Headmaster / Role</p>
                <p className="text-gray-800">
                  {req.contactName} ({req.roleTitle})
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Contact</p>
                <p className="text-gray-800">
                  {req.contactEmail} | {req.contactPhone}
                </p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div>{getStatusBadge(req.status)}</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(req._id)}
                    disabled={req.status === "complete"}
                    className="px-5 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-50"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(req._id)}
                    disabled={req.status === "cancelled"}
                    className="px-5 py-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
