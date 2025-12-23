import { Navigate } from "react-router-dom";

const TeacherRoute = ({ children }) => {
  const token = localStorage.getItem("teacher-token");
  return token ? children : <Navigate to="/login" />;
};

export default TeacherRoute;
