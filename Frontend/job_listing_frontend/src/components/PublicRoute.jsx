import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token && role) {
    return (
      <Navigate
        to={role === "employer" ? "/employer/dashboard" : "/seeker/dashboard"}
        replace
      />
    );
  }

  return children;
};
