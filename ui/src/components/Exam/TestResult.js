import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.js";

export const TestResult = ({ examInfo }) => {
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [examState, setExamState] = useState({});
  let navigate = useNavigate();
  const { state, updateState } = useContext(AuthContext);
  const getExamInfo = async (examId) => {
    let examInfoURL = `http://localhost:4000/exams/${examId}?withAnswer=True`;

    try {
      let { data } = await axios.get(examInfoURL, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      setExamState(data.data);
    } catch (e) {
      state.triggerToast(e.response.data.message, "error");
      navigate("/feed");
    }
  };

  const calculateScore = (questions) => {
    let totalCorrectAns = questions.reduce(
      (sum, curr) => (curr.answer === curr.userAnswer ? sum + 1 : sum),
      0
    );
    setScore(totalCorrectAns);
  };

  useEffect(() => {
    calculateScore(examInfo.userRecordedAnswers);
  }, []);

  return (
    <div className="px-6 py-4 w-1/2 mx-auto rounded-lg bg-blue-500 text-white">
      <span className="block font-bold text-xl mb-2">
        Congratulations! You have scored {score} / {examInfo?.questions?.length}
        !
      </span>
      <button
        className="px-4 py-2 bg-blue-400 rounded-lg font-semibold"
        onClick={() => setShowResult((prev) => !prev)}
      >
        {showResult ? "Hide" : "Show"} Results
      </button>

      {/* <label htmlFor="name">Name</label>
        {!isEdit && <label htmlFor="displayName">Dhruv</label>}
        {isEdit && <input type="text" name="name" id="" value={user.fir} />} */}

      <Link to={"/test-yourself"}>
        <button className="px-4 py-2 ml-4 bg-blue-400 rounded-lg font-semibold">
          Take Another
        </button>
      </Link>
      {showResult &&
        examInfo.userRecordedAnswers.map((question, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-4 bg-blue-700 px-6 py-4 rounded-lg shadow-lg my-4"
          >
            <span className="block text-center">Question {idx + 1}</span>

            <span className="block">{question.question}</span>
            <div>
              {question.options.map((option, oidx) => {
                return (
                  <div
                    key={oidx}
                    id={`option${oidx}`}
                    className={`flex items-center justify-between p-3 w-full bg-blue-50 ${
                      option === question.userAnswer &&
                      option !== question.answer
                        ? "border-4 border-solid border-red-500"
                        : ""
                    } ${
                      option === question.answer
                        ? "border-4 border-solid border-green-500"
                        : ""
                    }`}
                  >
                    <div>
                      <input
                        type="radio"
                        id={question + oidx}
                        value={option}
                        name={`question${idx + 1}`}
                        className="radio radio-primary radio-xs"
                        disabled={true}
                        defaultChecked={option === question.userAnswer}
                      />
                      <label
                        htmlFor={`question${idx + 1}`}
                        className="ml-2 cursor-pointer text-sm font-medium text-gray-900"
                        id={`label${idx + 1}`}
                      >
                        {option}
                      </label>
                    </div>
                    {option === question.answer && "✔️"}
                    {option === question.userAnswer &&
                      option !== question.answer &&
                      "❌"}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
    </div>
  );
};
