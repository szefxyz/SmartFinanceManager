import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({ children }) => {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Ładowanie...</div>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};