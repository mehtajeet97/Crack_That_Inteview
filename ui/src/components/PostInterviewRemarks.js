import axios from "axios";
import { useState, useEffect, useContext } from "react";
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
  const [interviewInformation, setInterviewInformation] = useState([]);
  const { state, updateState } = useContext(AuthContext);
  const userId = useParams().id;

  const criterias = [
    "Role Related Knowledge",
    "General Cognitive Ability",
    "Communication",
    "Attitude and Motivation",
    "Team Player",
    "Additional Comments",
  ];

  const [formState, setFormState] = useState(initialState);

  const interviewDetails = state.userDetails;

  useEffect(() => {
    const getInterview = async () => {
      let interviewInfo = await getInterviewInfo(interviewDetails._id);

      setInterviewInformation(interviewInfo);
    };
    getInterview();
  }, []);

  const getInterviewInfo = async (id) => {
    const { data } = await axios.get(`http://localhost:4000/interviews/${id}`, {
      headers: { Authorization: `${localStorage.getItem("accessToken")}` },
    });
    console.log(data);
    return data;
  };

  const displayRating = (e) => {
    console.log(e.target.value);
    // setRating(e.target.value);
  };

  const updateUserBanStatus = (payload) => {
    // let url =
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log({ formState });
  };

  return (
    <div className="bg-blue-700 rounded overflow-hidden shadow-lg text-center mb-2 w-1/2 mx-auto px-6 py-4">
      <h1 className="align-center font-semibold text-center text-white">
        Interview Remarks
      </h1>
      <p className="align-center font-semibold text-center text-white mt-4">
        You just interviewed
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
                Role Related Knowledge
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
