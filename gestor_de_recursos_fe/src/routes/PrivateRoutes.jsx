import { Navigate } from "react-router-dom";
import { isAuthenticated, hasRole } from "../utils/auth.utils";

const PrivateRoute = ({ children, roles }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" />;
  }

  if (roles && !hasRole(roles)) {
    return <Navigate to="/" />; 
  }

  return children;
};

export default PrivateRoute;