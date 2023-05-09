/**user premium
 * need help in update the status as soon as the user submits a request if cant resolve we can set the
 * redirect to the premium page as soon as he hits
 */

import { useEffect, useState, useContext } from "react";
// import { PremiumPage1 } from "./PremiumPage1.js";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.js";
import axios from "axios";
import img from "../virtualInterview.jpg";
import logo from "../logo.svg";
import support from "../support.webp";
import test from "../test.jpg";
import blog from "../blog.png";

export const Premium = () => {
  const navigate = useNavigate();
  const { state, updateState } = useContext(AuthContext);
  const userDetails = state.userDetails;
  console.log(userDetails);

  const userIsPremium = userDetails.isPremiumUser;
  const userId = userDetails._id;
  const userRequest = "";

  let [mark, setMark] = useState(0);
  let [flag, setFlag] = useState(0);
  const toggleChange = () => {
    if (mark) setMark((prev) => prev - 1);
    else setMark((prev) => prev + 1);
  };

  if (userIsPremium) {
    return <Navigate to="/feed" />;
  }
  const premiumPage1 = (
    <div className=" rounded-lg bg-cover h-full ">
      <div className="flex flex-col m-16 h-full bg-white/30 items-center z-0">
        <div className="flex flex-col items-center">
          <h1
            className="font-bold text-5xl text-slate-950
            
"
          >
            Join Our Premium
          </h1>
        </div>
        <div className="flex justify-evenly m-5">
          <div className="flex flex-col items-start p-5 max-h-fit space-y bg-blue-700 basis-2/7 rounded-lg   shadow-lg text-white text-truncate flex-wrap">
            <img
              src={support}
              className="max-h-20 max-w-20 m-10 rounded-lg self-center flex-wrap"
              alt="top interviewers"
            />
            <span>
              <h1 className="font-bold"> Interviews With Top Interviewers</h1>
              <p>
                Have interviews with our top interviews where you can get great
                guidance and get trained for top company interviews
              </p>
            </span>
          </div>
          <div className="flex flex-col items-start p-5  max-h-fit space-y bg-blue-700 basis-2/7 rounded-lg justify-around  shadow-lg text-white text-truncate flex-wrap">
            <img
              src={test}
              className="bg-white max-h-20 max-w-20 m-5 rounded-lg self-center "
              alt="top questions"
            />
            <h1 className="font-bold">
              {" "}
              Get Top Questions For The Preperation
            </h1>
            <span>
              <p>
                {" "}
                Get access to the top unanswered questions and their detailed
                solution
              </p>
            </span>
          </div>
          <div className="flex flex-col items-start p-5 max-h-fit space-y bg-blue-700 basis-2/7 rounded-lg   shadow-lg text-white text-truncate flex-wrap">
            <img
              src={blog}
              className="bg-white max-h-20 max-w-20 m-5 rounded-lg self-center "
              alt="premium blogs and news letters"
            />
            <h1 className="font-bold">
              {" "}
              Get News letters, Notification and Access to premium blogs
            </h1>
            <span>
              <p>
                With the premium access you can get weekly newsletter of the top
                blogs, access to the premium blogs and notification as soon as
                the blogs created
              </p>
            </span>
          </div>
        </div>
        <div className="capitalize flex flex-col max-h-min w-1/5 py-2 items-center m-10 bg-blue-700 rounded-lg text-white font-bold">
          {userDetails.requestPremium.status !== "new" ? (
            <>
              <p>Status : "{userDetails.requestPremium.status}"</p>
            </>
          ) : (
            <button
              className={
                flag
                  ? "invisible"
                  : "self-center bg-yellow-300 px-3 py-2 text-red-400 m-3 rounded-lg font-bold"
              }
              onClick={toggleChange}
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </div>
  );
  const update = (res) => {
    localStorage.setItem(
      "userDetails",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("userDetails")),
        requestPremium: res.data.data.data.requestPremium,
      })
    );
    updateState({
      ...state,
      isLoggedIn: false,
      userDetails: {
        ...userDetails,
        request: res.data.data.data.requestPremium,
      },
    });
    return null;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    let payload = event.target[0].value;
    if (payload.length) {
      try {
        setFlag(0);
        const res = await axios.patch(
          `http://localhost:4000/users/${userId}`,
          { message: payload, status: "pending" },
          {
            headers: {
              reqType: "premium-request",
              Authorization: localStorage.getItem("accessToken"),
            },
          }
        );
        update(res);
        state.triggerToast("Your Request Has Been Submitted", "success");
        toggleChange();
        setFlag(1);
        navigate("/feed");
      } catch (e) {
        console.log(e);
        state.triggerToast(
          "Your session has been expired. Please log in.",
          "error"
        );
        localStorage.clear();
        navigate("/login");
      }
    } else {
      setFlag(1);
    }
  };

  const premiumPage2 = (
    <>
      (
      <form
        className="h-full w-full p-10 flex flex-col  items-center "
        onSubmit={handleSubmit}
      >
        <p className="my-5 ml-15  self-center font-bold ">
          Your reason to be a part of out premium program
        </p>
        <div className="h-full w-10/12">
          <textarea
            id="reason"
            rows="8"
            placeholder="Your reason for Joining the Premium :"
            className="grow  resize-none  w-full m-5 p-3 rounded-lg focus:outline-none bg-blue-400 text-white placeholder-white"
          ></textarea>
        </div>
        <div className="w-full flex flex-row justify-center">
          <button
            type="submit"
            className="bg-yellow-300 px-3 py-2 w-1/5  text-red-400 m-3 rounded-lg font-bold"
          >
            Submit
          </button>
          <button
            onClick={toggleChange}
            className="bg-yellow-300 px-3 py-2 w-1/5  text-red-400 m-3 rounded-lg font-bold"
          >
            ❌ Cancel
          </button>
        </div>
        <p id="error" className={`${flag ? "visible" : "invisible"}`}>
          please enter something
        </p>
        <p id="test"></p>
      </form>
      )
      {flag && flag?.message && flag.message == "ok" && (
        <div className="flex items-center font-bold m-10 bg-green-300 ">
          <p className="self-center">Request Submitted</p>
        </div>
      )}
    </>
  );

  const page = [premiumPage1, premiumPage2];

  return <div className="h-full w-full">{page[mark]}</div>;
};
