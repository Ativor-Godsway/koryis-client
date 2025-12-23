import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useGetStudentsQuery } from "../../redux/StudentApi";
import { useGetParentsQuery } from "../../redux/ParentApi";
import { useGetTeachersQuery } from "../../redux/TeacherApi";
import { useGetSchoolsQuery } from "../../redux/SchoolApi";
import { useGetRequestsQuery } from "../../redux/SchoolRequestApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const { data: studentsList = [], isFetching: loadingStudents } =
    useGetStudentsQuery();

  const {
    data: parentsList = [],
    refetch: refetchParents,
    isFetching: loadingParents,
  } = useGetParentsQuery();

  const {
    data: teachersList = [],
    refetch: refetchTeachers,
    isFetching: loadingTeachers,
  } = useGetTeachersQuery();

  const {
    data: schoolsList = [],
    refetch: refetchSchools,
    isFetching: loadingSchools,
  } = useGetSchoolsQuery();

  // Fetch requests from backend
  const { data, isLoading, isError } = useGetRequestsQuery();
  const requests = data?.data || [];

  // -------------------------
  // BASIC ANALYTICS
  //--------------------------
  const totalStudents = studentsList.length;

  // Gender
  const genderCounts = studentsList.reduce((acc, s) => {
    const g = s.gender || "Unknown";
    acc[g] = (acc[g] || 0) + 1;
    return acc;
  }, {});

  // Year groups
  const yearGroupCounts = studentsList.reduce((acc, s) => {
    const y = s.yearGroup || "Unknown"; // e.g. "Year 1"
    acc[y] = (acc[y] || 0) + 1;
    return acc;
  }, {});

  // Sort 1 → 13 and put "Unknown" last
  const orderedYearGroups = Object.keys(yearGroupCounts).sort((a, b) => {
    if (a === "Unknown") return 1;
    if (b === "Unknown") return -1;

    const numA = Number(a.replace("Year ", ""));
    const numB = Number(b.replace("Year ", ""));
    return numA - numB;
  });

  // Cities (Demographics)
  const cityCounts = studentsList.reduce((acc, s) => {
    const c = s.city || "Unknown";
    acc[c] = (acc[c] || 0) + 1;
    return acc;
  }, {});

  // School types
  const schoolTypeCounts = studentsList.reduce((acc, s) => {
    const type = s.schoolType || "Unknown";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  // Students with/without school
  const schoolStats = studentsList.reduce(
    (acc, s) => {
      if (s.school && s.school.trim() !== "") acc.withSchool++;
      else acc.withoutSchool++;
      return acc;
    },
    { withSchool: 0, withoutSchool: 0 }
  );

  if (loadingStudents) return <p className="p-6">Loading...</p>;

  // -------------------------
  // CHART OPTIONS (NO ANIMATION)
  //--------------------------
  const baseOptions = {
    animation: false,
    responsive: true,
    plugins: { legend: { display: true } },
  };

  return (
    <div className="p-1 md:p-6 space-y-10">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-base-200 shadow-md rounded-lg p-3">
          <h2 className="text-[0.8rem] text-[#575757] flex items-center gap-2">
            Total Users
          </h2>
          <p className="text-2xl font-bold">
            {studentsList.length + teachersList.length + parentsList.length}
          </p>
        </div>

        <div className="bg-base-200 shadow-md rounded-lg p-3">
          <h2 className="text-[0.8rem] text-[#575757] flex items-center gap-2">
            Total Students
          </h2>
          <p className="text-2xl font-bold">{studentsList.length}</p>
        </div>

        <div className="bg-base-200 shadow-md rounded-lg p-3">
          <h2 className="text-[0.8rem] text-[#575757] flex items-center gap-2">
            Total Parents
          </h2>
          <p className="text-2xl font-bold">{parentsList.length}</p>
        </div>

        <div className="bg-base-200 shadow-md rounded-lg p-3">
          <h2 className="text-[0.8rem] text-[#575757] flex items-center gap-2">
            Total Teachers
          </h2>
          <p className="text-2xl font-bold">{teachersList.length}</p>
        </div>

        <div className="bg-base-200 shadow-md rounded-lg p-3">
          <h2 className="text-[0.8rem] text-[#575757] flex items-center gap-2">
            Total Schools
          </h2>
          <p className="text-2xl font-bold">{schoolsList.length}</p>
        </div>

        <div className="bg-base-200 shadow-md rounded-lg p-3">
          <h2 className="text-[0.8rem] text-[#575757] flex items-center gap-2">
            Student's With School
          </h2>
          <p className="text-2xl font-bold">{schoolStats.withSchool}</p>
        </div>

        <div className="bg-base-200 shadow-md rounded-lg p-3">
          <h2 className="text-[0.8rem] text-[#575757] flex items-center gap-2">
            Student's Without School
          </h2>
          <p className="text-2xl font-bold">{schoolStats.withoutSchool}</p>
        </div>

        <div className="bg-base-200 shadow-md rounded-lg p-3">
          <h2 className="text-[0.8rem] text-[#575757] flex items-center gap-2">
            {/* <div aria-label="status" className="status status-info"></div> */}
            Pending Requests
          </h2>
          <p className="text-2xl font-bold">
            {requests.filter((r) => r.status === "pending").length}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {/* Gender Distribution */}
        <ChartCard title="Gender Distribution" className="flex-1 min-w-[300px]">
          <Pie
            data={{
              labels: Object.keys(genderCounts),
              datasets: [
                {
                  label: "Count",
                  data: Object.values(genderCounts),
                  backgroundColor: ["#3b82f6", "#f87171", "#34d399"],
                },
              ],
            }}
            options={baseOptions}
          />
          <div>
            <p>Males : {genderCounts.Male}</p>
            <p>Females : {genderCounts.Female}</p>
          </div>
        </ChartCard>

        {/* School Types */}
        <ChartCard title="School Types" className="flex-1 min-w-[300px]">
          <Pie
            data={{
              labels: Object.keys(schoolTypeCounts),
              datasets: [
                {
                  label: "Count",
                  data: Object.values(schoolTypeCounts),
                  backgroundColor: [
                    "#14b8a6",
                    "#f43f5e",
                    "#f59e0b",
                    "#3b82f6",
                    "#8b5cf6",
                  ],
                },
              ],
            }}
            options={baseOptions}
          />
          <div>
            {/* <p>Males : {genderCounts.Male}</p>
            <p>Females : {genderCounts.Female}</p> */}
          </div>
        </ChartCard>
      </div>
      {/* Year Groups */}
      <ChartCard title="Students by Year Group">
        <Bar
          data={{
            labels: orderedYearGroups.map((y) =>
              y === "Unknown" ? "Unknown" : `${y}`
            ),
            datasets: [
              {
                label: "Count",
                data: orderedYearGroups.map((y) => yearGroupCounts[y]),
                backgroundColor: "#fbbf24",
              },
            ],
          }}
          options={{
            ...baseOptions,
            plugins: { legend: { display: false } },
          }}
        />
      </ChartCard>

      {/* City Demographics */}
      <ChartCard title="Students by City">
        <Bar
          data={{
            labels: Object.keys(cityCounts),
            datasets: [
              {
                label: "Count",
                data: Object.values(cityCounts),
                backgroundColor: "#6366f1",
              },
            ],
          }}
          options={{ ...baseOptions, plugins: { legend: { display: false } } }}
        />
      </ChartCard>
    </div>
  );
}

/* -----------------------------
   Small Reusable Components
-------------------------------- */

function SummaryCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow text-center border">
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

function ChartCard({ title, children, className = "" }) {
  return (
    <div className={`bg-white p-4 rounded-lg shadow border ${className}`}>
      <h2 className="text-lg font-semibold mb-4 text-center">{title}</h2>
      {children}
    </div>
  );
}
