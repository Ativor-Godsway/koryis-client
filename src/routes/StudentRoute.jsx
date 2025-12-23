import { Navigate } from "react-router-dom";

const StudentRoute = ({ children }) => {
  const token = localStorage.getItem("student-token");
  return token ? children : <Navigate to="/login" />;
};

export default StudentRoute;
