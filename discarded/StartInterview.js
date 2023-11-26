import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext.js";

export const StartInterview = () => {
  const navigate = useNavigate();
  const { state, updateState } = useContext(AuthContext);
  const userDetails = state.userDetails;

  const [interviewList, setInterviewList] = useState("");
  const [check, setCheck] = useState(0);
  const [payload, setPayload] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        let userId = userDetails._id;
        let { data, status } = await axios.get(
          `http://localhost:4000/slots/${userId}`,
          {
            headers: {
              Authorization: localStorage.getItem("accessToken"),
            },
          }
        );

        if (status === 200) {
          const now = new Date();
          // Loop through the upcoming interviews.
          for (let i = 0; i < data.length; i++) {
            const interview = data[i];

            const dateString = interview.timings;
            const parts = dateString.split(" to ");
            const hours = parseInt(parts[0].split(":")[0], 10);
            // const minutes = parseInt(parts[0].split(":")[1], 10);
            const amPm = parts[1];

            const newDate = new Date(interview.date);
            newDate.setHours(hours);
            // newDate.setMinutes(minutes);

            if (amPm === "am") {
              newDate.setHours(newDate.getHours() - 12);
            }

            // If the interview has started, start it.
            if (now >= newDate) {
              setPayload(interview);
              setInterviewList("There is an Interview today!");
              setCheck(1);
            } else {
              setInterviewList("There are no Interviews today.");
            }
          }
        } else {
          state.triggerToast(data.errors, "error");
        }
      } catch (e) {
        if (e.response.data.errors === "Access Token expired") {
          localStorage.clear();
          updateState({ ...state, isLoggedIn: false, userDetails: {} });
          state.triggerToast(
            "Session expired. Please log in again.",
            "success"
          );
          navigate("/login");
        } else {
          state.triggerToast(e.response.data.message, "error");
          //   navigate("/feed");
        }
      }
    }
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    if (userDetails.role === "student") {
      // navigate(`/ongoing`);
    } else {
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0">
      <div className="w-full rounded-lg shadow md:mt-4 sm:max-w-md xl:p-0 bg-blue-500">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
            {interviewList}
          </h1>
          {check !== 1 && (
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full text-white border-2 border-solid border-white hover:bg-lime-500
             hover:text-black hover:border-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm mt-3 px-5 py-2.5 text-center"
            >
              Start Interview
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
