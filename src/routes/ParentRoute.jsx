import { Navigate } from "react-router-dom";

const ParentRoute = ({ children }) => {
  const token = localStorage.getItem("parent-token");
  return token ? children : <Navigate to="/login" />;
};

export default ParentRoute;
