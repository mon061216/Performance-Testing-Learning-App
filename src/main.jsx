import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./routes/router";
import "./styles/styles.css";

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
