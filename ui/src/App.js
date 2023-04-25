import logo from "./logo.svg";
import "./App.css";
import { Navbar } from "./components/Navbar.js";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <div className="p-4 bg-cyan-50 h-screen">
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default App;
