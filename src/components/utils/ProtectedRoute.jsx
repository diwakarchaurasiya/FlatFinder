import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const location = useLocation();

  // Read user data from localStorage
  const owner = localStorage.getItem("owner_token");
  const tenant = localStorage.getItem("tenant_token");

  // If no user is logged in
  if (!owner && !tenant) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If role is required but doesn't match
  if (role === "owner_token" && !owner) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role === "tenant_token" && !tenant) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If everything's fine, show the component
  return children;
};

export default ProtectedRoute;
