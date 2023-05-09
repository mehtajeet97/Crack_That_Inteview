import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext.js";
import { useNavigate } from "react-router-dom";

export const InterviewRecords = () => {
  const { state, updateState } = useContext(AuthContext);
  const userDetails = state.userDetails;
  const userId = userDetails._id;

  const navigate = useNavigate();

  //Retreiving Upcoming & Past Interviews
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);

  //Check if interview is right now
  const [interviewList, setInterviewList] = useState("");
  const [check, setCheck] = useState(0);

  useEffect(() => {
    const getData = async () => {
      getUpcoming();
      getPast();
    };
    getData();
  }, []);

  const getUpcoming = async () => {
    let { data, status } = await axios.get(
      `http://localhost:4000/slots/${userId}`,
      {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      }
    );
    if (status === 200) {
      setUpcoming(data);

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
        let newD1 = new Date(); // For Testing
        // If the interview has started, start it.
        if (now >= newDate) {
          setInterviewList("There is an Interview today!");
          setCheck(1);
        } else {
          setInterviewList("There are no Interviews today");
        }
      }
    } else {
      state.triggerToast(data.errors, "error");
    }
  };

  const getPast = async () => {
    let { data, status } = await axios.get(
      `http://localhost:4000/schedule/${userId}`,
      {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      }
    );
    if (status === 200) {
      setPast(data);
    } else {
      state.triggerToast(data.errors, "error");
    }
  };

  const handleSubmit = (interview) => {
    let interviewId = interview.interviewid;
    navigate(`/interview/${interviewId}`);
  };

  return (
    <div className="flex flex-col bg-blue-700 rounded overflow-hidden shadow-lg items-center text-xl mb-2 w-4/5 mx-auto px-6 py-4">
      <>
        {upcoming.length > 0 && (
          <>
            <div className="overflow-x-auto text-white font-semibold text-4xl m-4 overflow-hidden">
              Upcoming Interviews
            </div>
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  {userDetails.role === "interviewer" ? (
                    <th>Student</th>
                  ) : (
                    <th>Interviewer</th>
                  )}

                  <th>Interview Date</th>
                  <th>Interview Time</th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody>
                {upcoming.map((interview) => {
                  return (
                    <tr key={"num"}>
                      {userDetails.role === "interviewer" ? (
                        <td>{interview.studentName}</td>
                      ) : (
                        <td>{interview.interviewerName}</td>
                      )}

                      <td>{interview.date}</td>
                      <td>{interview.timings}</td>
                      <td>
                        {interviewList}
                        {check !== 0 && (
                          <button
                            type="submit"
                            onClick={() => handleSubmit(interview)}
                            className=" text-white border-2 border-solid border-white hover:bg-lime-500
             hover:text-black hover:border-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm mt-1 ml-3 px-5 py-1 text-center"
                          >
                            Start
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
        {past.length > 0 && (
          <>
            <div className="overflow-x-auto text-white font-semibold text-4xl m-4 overflow-hidden">
              Past Interviews
            </div>
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  {userDetails.role === "interviewer" ? (
                    <th>Student</th>
                  ) : (
                    <th>Interviewer</th>
                  )}

                  <th>Interview Date</th>
                  <th>Interview Time</th>
                </tr>
              </thead>
              <tbody>
                {past.map((interview) => {
                  return (
                    <tr key={"num"}>
                      {userDetails.role === "interviewer" ? (
                        <td>{interview.studentName}</td>
                      ) : (
                        <td>{interview.interviewerName}</td>
                      )}
                      <td>{interview.date}</td>
                      <td>{interview.duration}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </>
    </div>
  );
};
