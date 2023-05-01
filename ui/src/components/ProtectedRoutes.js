import { useEffect, useState } from "react";
import { Login } from "./Login.js";
import { useNavigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkUserToken = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken || accessToken === "undefined") {
      setIsLoggedIn(false);
      localStorage.clear();
      navigate("/login");
    } else {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

  return <>{isLoggedIn ? children : <Login />}</>;
};
