import type { ReactNode } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import Auth from "./pages/auth/Auth";
import Dashboard from "./pages/dashboard/Dashboard";

import ProtectedRoute from "./components/global/protectedRoute/ProtectedRoute";

import { useAuth } from "./context/AuthContext";

interface AuthWrapperPropsI {
  children: ReactNode;
}

const RootRedirect = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />;
};

const AuthWrapper = ({ children }: AuthWrapperPropsI) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to={"/dashboard"} replace />;
  }

  return <>{children}</>;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRedirect />,
  },
  {
    path: "/login",
    element: (
      <AuthWrapper>
        <Auth />
      </AuthWrapper>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <div>Страница не найдена</div>,
  },
]);
