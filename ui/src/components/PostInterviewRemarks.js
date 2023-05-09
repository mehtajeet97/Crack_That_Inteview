import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.js";
import { Rating } from "./Rating.js";
import { useParams } from "react-router-dom";

const intialRating = 5;
const criterias = [
  "Role Related Knowledge",
  "General Cognitive Ability",
  "Communication",
  "Attitude and Motivation",
  "Team Player",
  "Additional Comments",
];

const initialState = {};
criterias.map((criteria) => {
  initialState[criteria] =
    criteria === "Additional Comments" ? "" : intialRating;
});

export const PostInterviewRemarks = () => {
  const navigate = useNavigate();
  const [interviewInformation, setInterviewInformation] = useState([]);
  const { state, updateState } = useContext(AuthContext);
  const interviewId = useParams().id;

  const criterias = [
    "Role Related Knowledge",
    "General Cognitive Ability",
    "Communication",
    "Attitude and Motivation",
    "Team Player",
    "Additional Comments",
  ];

  const [formState, setFormState] = useState(initialState);

  const interviewDetails = state.interviewDetails;

  useEffect(() => {
    const getInterview = async () => {
      let interviewInfo = await getInterviewInfo();
      setInterviewInformation(interviewInfo);
    };
    getInterview();
  }, []);

  const getInterviewInfo = async () => {
    const { data } = await axios.get(
      `http://localhost:4000/interview/${interviewId}`,
      {
        headers: { Authorization: `${localStorage.getItem("accessToken")}` },
      }
    );
    console.log(data);
    return data;
  };

  const updateRemarks = async () => {
    try {
      let payload = formState;
      console.log(payload);
      const interviewURL = `http://localhost:4000/interview/${interviewId}`;
      let { data, status } = await axios.patch(interviewURL, payload, {
        headers: {
          update: "interviewremarks",
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      });
      if (status === 200) {
        setInterviewInformation(data);
        navigate("/feed");
      } else {
        console.log(data);
      }
    } catch (e) {
      console.log(e.response);
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    updateRemarks();
    console.log({ formState });
  };

  return (
    <div className="bg-blue-700 rounded overflow-hidden shadow-lg text-center mb-2 w-1/2 mx-auto px-6 py-4">
      <h1 className="align-center font-semibold text-center text-white">
        Interview Remarks
      </h1>
      <p className="align-center font-semibold text-center text-white mt-4">
        You just interviewed {interviewInformation.interviewee}
      </p>
      <p className="align-center font-semibold text-center text-white mt-4">
        Please provide your feedback below
      </p>
      <form
        className="w-full flex justify-center interview-remarks-form mb-2 text-center"
        onSubmit={handleSubmit}
      >
        <div className="w-full space-y-4 rounded-lg sm:max-w-md xl:p-0 mt-4 text-center">
          {criterias.map((criteria, idx) => (
            <div key={idx} className="rounded-lg max-w-md flex justify-between">
              <label
                className="text-white font-semibold text-center mt-4 mb-2"
                htmlFor="role-related-knowledge"
              >
                {criteria}
              </label>
              {criteria !== "Additional Comments" ? (
                <Rating
                  onChange={(criteria, rating) => {
                    console.log("Previous value", formState);
                    console.log({ criteria, rating });
                    setFormState({ ...formState, [criteria]: +rating });
                    console.log("Current value", formState);
                  }}
                  name={criteria}
                  value={+formState[criteria]}
                ></Rating>
              ) : (
                <textarea
                  name={criteria}
                  className="textarea textarea-bordered"
                  placeholder="Fantastic candidate!"
                  onChange={(event) => {
                    setFormState({
                      ...formState,
                      [criteria]: event.target.value,
                    });
                  }}
                ></textarea>
              )}
            </div>
          ))}
        </div>
      </form>
      <button type="submit" className="btn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};
