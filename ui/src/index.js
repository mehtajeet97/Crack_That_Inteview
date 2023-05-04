import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NotFound404 } from "./components/NotFound404";
import { Feed } from "./components/Feed";
import { Interview } from "./components/Interview.js";
import { TestYourself } from "./components/TestYourself";
import { Blogs } from "./components/Blogs";
import { Trending } from "./components/Trending";
import { Profile } from "./components/Profile";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Landing } from "./components/Landing";
import { Register } from "./components/Register";
import { Premium } from "./components/Premium";
import { DetailBlog } from "./components/DetailBlog";
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
        path: "interview",
        element: <Interview />,
      },
      {
        path: "test-yourself",
        element: <TestYourself />,
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "blogs/:blogId",
        element: <DetailBlog />,
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
      {
        path: "join-premium",
        element: <Premium />,
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
