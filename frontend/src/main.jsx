import "./styles/index.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout/Layout.jsx";
import { Home } from "./pages/Home/index.jsx";
import { Payments } from "./pages/Payments/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        handle: { title: "Dashboard", showTimeFilters: false },
      },
      {
        path: "payments",
        element: <Payments />,
        handle: { title: "Payments", showTimeFilters: true },
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
