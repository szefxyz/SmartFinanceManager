import "./styles/index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import App from "./App.jsx";
import LoginPage from "./pages/Login/index.jsx";
import RegisterPage from "./pages/Register/index.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
