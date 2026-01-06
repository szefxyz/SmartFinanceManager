import "./styles/index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { Home } from "./pages/Home";
import { Transaction } from "./pages/Transaction";
import { Categories } from "./pages/Categories/index.jsx";
import { AddTransactionPage } from "./pages/AddTransactionPage";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import { DashboardLayout } from "./layouts/DashboardLayout/DashboardLayout";
import { DefaultLayout } from "./layouts/DefaultLayout/DefaultLayout";

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
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
        handle: { title: "Dashboard", showTimeFilters: false },
      },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <DefaultLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "transactions",
        element: <Transaction />,
        handle: { title: "Transaction", showTimeFilters: true },
      },
      {
        path: "categories",
        element: <Categories />,
        handle: { title: "Categories", showTimeFilters: false },
      },
      {
        path: "add-transaction",
        element: <AddTransactionPage />,
        handle: { title: "Add New Transaction", showTimeFilters: false },
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
