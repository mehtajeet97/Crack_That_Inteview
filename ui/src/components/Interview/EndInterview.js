import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext.js";
import { OnGoingInterview } from "./OnGoingInterview.js";

export const EndInterview = () => {
  const { state, updateState } = useContext(AuthContext);
  const userDetails = state.userDetails;

  const navigate = useNavigate();

  // For retrieveing Interviewer ID
  const { interviewId } = useParams();

  const [interviewerName, setInterviewerName] = useState("");
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        let { data, status } = await axios.get(
          `http://localhost:4000/interview/${interviewId}`,
          {
            headers: {
              Authorization: localStorage.getItem("accessToken"),
            },
          }
        );
        if (status === 200) {
          setInterviewerName(data.interviewer);
          setStudentName(data.interviewee);
        } else {
          state.triggerToast(data.errors, "error");
        }
      } catch (e) {
        if (e.response.data.message === "Access Token expired") {
          localStorage.clear();
          updateState({ ...state, isLoggedIn: false, userDetails: {} });
          state.triggerToast(
            "Session expired. Please log in again.",
            "success"
          );
          navigate("/login");
        } else {
          state.triggerToast(e.response.data, "error");
          navigate("/feed");
        }
      }
    }
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    endInterview(userDetails._id, interviewId);
    if (userDetails.role === "interviewer") {
      navigate(`/interviewremarks/${interviewId}`);
    } else {
      navigate(`/feed`);
    }
  };

  const handleNoShow = (event) => {
    event.preventDefault();
    endInterview(userDetails._id, interviewId);
    navigate(`/interviewremarks/${interviewId}`);
  };

  const endInterview = async (user, interview) => {
    try {
      let url = `http://localhost:4000/schedule/${user}`;
      let headers = {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      };
      let payload = { interview };
      let { data, status } = await axios.post(url, payload, headers);
      if (status === 200) {
        state.triggerToast("Interview has Ended", "success");
      } else {
        state.triggerToast("Interview End Failure", "error");
      }
    } catch (e) {
      if (e.response.data.message === "Access Token expired") {
        localStorage.clear();
        updateState({ ...state, isLoggedIn: false, userDetails: {} });
        state.triggerToast("Session expired. Please log in again.", "success");
      } else {
        state.triggerToast(e.response.data.message, "error");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0">
      <OnGoingInterview></OnGoingInterview>
      {userDetails.role === "interviewer" ? (
        <div className="w-full rounded-lg shadow md:mt-4 sm:max-w-md xl:p-0 bg-blue-500">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Currently interviewing :
            </h1>

            <div className="w-full">
              <p className="block mb-2 text-xl font-medium text-white">
                {studentName}
              </p>
            </div>
            <button
              type="submit"
              onClick={handleNoShow}
              className="w-full text-white border-2 border-solid border-white hover:bg-red-600
             hover:text-black hover:border-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm mt-3 px-5 py-2.5 text-center"
            >
              No Show
            </button>

            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full text-white border-2 border-solid border-white hover:bg-lime-500
             hover:text-black hover:border-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm mt-3 px-5 py-2.5 text-center"
            >
              End Interview
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full rounded-lg shadow md:mt-4 sm:max-w-md xl:p-0 bg-blue-500">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Currently in a interview with :
            </h1>

            <div className="w-full">
              <p className="block mb-2 text-xl font-medium text-white">
                {interviewerName}
              </p>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full text-white border-2 border-solid border-white hover:bg-red-600
             hover:text-black hover:border-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm mt-3 px-5 py-2.5 text-center"
            >
              End Interview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
