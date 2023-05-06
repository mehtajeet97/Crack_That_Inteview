import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext.js";
import Calendar from "react-calendar";
import "./Calendar.css";

export const OnGoingInterview = () => {
  return (
    <div className="w-full flex-col justify-center items-center bg-yellow-400 min-h-[50%] rounded-lg p-4">
      <span className="text-6xl">
        Interview Link
        <a href="https://zoom.us/" className="block" target="_blank">
          Click Here
        </a>
      </span>
    </div>
  );
};
