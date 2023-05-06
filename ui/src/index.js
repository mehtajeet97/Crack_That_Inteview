import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NotFound404 } from "./components/NotFound404.js";
import { Feed } from "./components/Feed.js";
import { Interview } from "./components/Interview/Interview.js";
import { TestYourself } from "./components/Exam/TestYourself.js";

import { ScheduleForInterviewer } from "./components/ScheduleForInterviewer.js";
import { ScheduleForStudent } from "./components/ScheduleForStudent.js";
import { SchedulingScreen2 } from "./components/SchedulingScreen2.js";
import { Blogs } from "./components/Blogs.js";
import { Trending } from "./components/Trending.js";
import { Profile } from "./components/Profile.js";
import { Login } from "./components/Login.js";
import { Signup } from "./components/Signup.js";
import { Landing } from "./components/Landing.js";
import { Register } from "./components/Register.js";

import { ProtectedRoutes } from "./components/ProtectedRoutes.js";
import { Premium } from "./components/Premium.js";
import { DetailBlog } from "./components/DetailBlog.js";
import { OnGoingInterview } from "./components/Interview/OnGoingInterview.js";
import { InterviewerSlots } from "./components/Interview/InterviewerSlots.js";
import { StudentSlots } from "./components/Interview/StudentSlots.js";
import { Admin } from "./components/Admin.js";
import { PostInterviewRemarks } from "./components/PostInterviewRemarks.js";

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
        element: (
          <ProtectedRoutes>
            <Feed />
          </ProtectedRoutes>
        ),
      },
      {
        path: "interview",
        element: (
          <ProtectedRoutes>
            <Interview />
          </ProtectedRoutes>
        ),
      },
      {
        path: "scheduleforinterviewer",
        element: (
          <ProtectedRoutes>
            <ScheduleForInterviewer />
          </ProtectedRoutes>
        ),
      },
      {
        path: "interviewerslots",
        element: (
          <ProtectedRoutes>
            <InterviewerSlots />
          </ProtectedRoutes>
        ),
      },
      {
        path: "studentslots",
        element: (
          <ProtectedRoutes>
            <StudentSlots />
          </ProtectedRoutes>
        ),
      },
      {
        path: "ongoing",
        element: (
          <ProtectedRoutes>
            <OnGoingInterview />
          </ProtectedRoutes>
        ),
      },
      {
        path: "scheduleforstudent",
        element: (
          <ProtectedRoutes>
            <ScheduleForStudent />
          </ProtectedRoutes>
        ),
      },
      {
        path: "scheduleforstudent/:interviewerId",
        element: (
          <ProtectedRoutes>
            <SchedulingScreen2 />
          </ProtectedRoutes>
        ),
      },

      {
        path: "test-yourself",
        element: (
          <ProtectedRoutes>
            <TestYourself />
          </ProtectedRoutes>
        ),
      },
      {
        path: "blogs",
        element: (
          <ProtectedRoutes>
            <Blogs />
          </ProtectedRoutes>
        ),
      },
      {
        path: "blogs/:blogId",
        element: (
          <ProtectedRoutes>
            <DetailBlog />
          </ProtectedRoutes>
        ),
      },
      {
        path: "trending",
        element: (
          <ProtectedRoutes>
            <Trending />
          </ProtectedRoutes>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        ),
      },
      {
        path: "interviewremarks",
        element: (
          <ProtectedRoutes>
            <PostInterviewRemarks />
          </ProtectedRoutes>
        ),
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
      {
        path: "join-premium",

        element: (
          <ProtectedRoutes>
            <Premium />
          </ProtectedRoutes>
        ),
      },
      {
        path: "admin",
        element: (
          <ProtectedRoutes>
            <Admin />
          </ProtectedRoutes>
        ),
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
