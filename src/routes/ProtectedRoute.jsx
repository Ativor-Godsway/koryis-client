import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const studentToken = localStorage.getItem("student-token");
  const teacherToken = localStorage.getItem("teacher-token");
  const parentToken = localStorage.getItem("parent-token");

  const isLoggedIn = studentToken || teacherToken || parentToken;

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
