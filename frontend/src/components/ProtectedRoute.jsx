import { useAuth } from "../context/auth";
import AccessDenied from "../pages/AccessDenied";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  return user?.isAdmin ? children : <AccessDenied />;
};

export default ProtectedRoute;
