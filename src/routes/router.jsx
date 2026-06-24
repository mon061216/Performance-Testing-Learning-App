import React from "react";
import { createBrowserRouter } from "react-router";
import App from "../app/App";
import { HomeView } from "../pages/HomeView";
import { PathView } from "../pages/PathView";
import { Exercise } from "../pages/Exercise";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomeView />,
      },
      {
        path: "course/:courseId",
        element: <PathView />,
      },
      {
        path: "course/:courseId/lesson/:lessonIndex",
        element: <Exercise />,
      },
    ],
  },
]);
