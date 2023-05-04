import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NotFound404 } from "./components/NotFound404.js";
import { Feed } from "./components/Feed.js";

import { ScheduleForInterviewer } from "./components/ScheduleForInterviewer.js";
import { ScheduleForStudent } from "./components/ScheduleForStudent.js";
import { SchedulingScreen2 } from "./components/SchedulingScreen2.js";

import { TestYourself } from "./components/TestYourself.js";
import { Blog } from "./components/Blog.js";
import { Trending } from "./components/Trending.js";
import { Profile } from "./components/Profile.js";
import { Login } from "./components/Login.js";
import { Signup } from "./components/Signup.js";
import { Landing } from "./components/Landing.js";
import { Register } from "./components/Register.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <NotFound404></NotFound404>,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "feed",
        element: <Feed />,
      },

      {
        path: "scheduleforinterviewer",
        element: <ScheduleForInterviewer />,
      },
      {
        path: "scheduleforstudent",
        element: <ScheduleForStudent />,
      },
      {
        path: "schedulingscreen2",
        element: <SchedulingScreen2 />,
      },

      {
        path: "test-yourself",
        element: <TestYourself />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "trending",
        element: <Trending />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
