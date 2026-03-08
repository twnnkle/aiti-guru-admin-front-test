import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../../../context/AuthContext";

interface ProtectedRoutePropsI {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRoutePropsI) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return <div>{children}</div>;
}

export default ProtectedRoute;
