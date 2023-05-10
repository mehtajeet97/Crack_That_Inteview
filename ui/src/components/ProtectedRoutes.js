import { useEffect, useState } from "react";
import { Login } from "./Login.js";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRoutes = ({ children }) => {
  const isLoggedIn =
    localStorage.getItem("accessToken") && localStorage.getItem("userDetails");
  const navigate = useNavigate();

  // const checkUserToken = () => {
  //   const accessToken = localStorage.getItem("accessToken");
  //   console.log({ accessToken });
  //   if (isLoggedIn) {

  //   } else {
  //     setIsLoggedIn(true);
  //   }
  // };

  // useEffect(() => {
  //   checkUserToken();
  // }, [isLoggedIn]);

  return <>{isLoggedIn ? children : <Login />}</>;
};
