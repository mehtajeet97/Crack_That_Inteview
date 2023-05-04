import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NotFound404 } from "./components/NotFound404.js";
import { Feed } from "./components/Feed.js";
import { Interview } from "./components/Interview.js";
import { TestYourself } from "./components/TestYourself.js";
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
