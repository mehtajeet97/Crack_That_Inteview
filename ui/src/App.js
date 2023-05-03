import logo from "./logo.svg";
import "./App.css";
import { Navbar } from "./components/Navbar.js";
import { Navbar2 } from "./components/Navbar2.js";
import { Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext.js";
import { ToastContainer } from "react-toastify";
function App() {
  // const state = useContext(AuthContext);
  const [state, updateState] = useState(useContext(AuthContext));
  return (
    <>
      <AuthContext.Provider value={{ state, updateState }}>
        <Navbar2></Navbar2>
        <div className="p-4 h-screen bg-cyan-50">
          <ToastContainer
            autoClose={3000}
            hideProgressBar={true}
            closeOnClick
          ></ToastContainer>
          <Outlet></Outlet>
        </div>
      </AuthContext.Provider>
    </>
  );
}

export default App;
