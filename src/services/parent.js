import API from "./api";

// Get parent dashboard info (children progress, badges, tasks summary)
export const getParentDashboard = async (parentCode) => {
  try {
    const response = await API.get(`/parents/${parentCode}/dashboard`);
    return response.data;
    // { name, children: [{name, code, tasksCompleted, badges, progress}], totalTasksCompleted }
  } catch (error) {
    throw error.response?.data?.msg || "Failed to fetch dashboard";
  }
};

// Get parent profile
export const getParentProfile = async (parentCode) => {
  try {
    const response = await API.get(`/parents/${parentCode}/profile`);
    return response.data; // { name, email, children }
  } catch (error) {
    throw error.response?.data?.msg || "Failed to fetch profile";
  }
};

// USAGE

// import { useEffect, useState } from "react";
// import { getStudentDashboard } from "../services/student";

// export default function StudentDashboard() {
//   const [dashboard, setDashboard] = useState(null);
//   const studentCode = localStorage.getItem("userID");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getStudentDashboard(studentCode);
//         setDashboard(data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchData();
//   }, [studentCode]);

//   if (!dashboard) return <p>Loading...</p>;

//   return (
//     <div>
//       <h1>Welcome {dashboard.name}</h1>
//       <p>Tasks Completed: {dashboard.tasksCompleted}</p>
//       <p>Progress: {dashboard.progress}%</p>
//       {/* Render badges here */}
//     </div>
//   );
// }
