import { useContext, useState, useEffect, useCallback } from "react";
import { QuestionCard } from "./QuestionCard.js";
import { TestCard } from "./TestCard.js";
import { TestResult } from "./TestResult.js";
import { AuthContext } from "../../context/AuthContext.js";
import { useBeforeUnload } from "react-router-dom";
import axios from "axios";

export const TestYourself = () => {
  const [pageStep, setPageStep] = useState(0);
  const { state, updateState } = useContext(AuthContext);
  let userDetails = state.userDetails;

  const [formState, setFormState] = useState({
    skill: "Pick one",
    role: userDetails.role,
    _id: userDetails._id,
  });

  const [flag, setFlag] = useState(false);
  const greetMessage = "Congratulations! 🎉🥺";
  const [counter, setCount] = useState(10);
  const testsOfInterest = [
    "Python",
    "Docker",
    "SQL",
    "Java",
    "C++",
    "C",
    "Javascript",
    "HTML",
    "CSS",
    "React",
    "Angular",
  ];

  const handleFieldChange = (event) => {
    const updatedState = {
      ...formState,
      [event.target.name]: event.target.value,
    };
    setFormState(updatedState);
  };

  const temp = [
    {
      question:
        "What is the output of the following code?\n\n>>> x = 5\n>>> y = 10\n>>> x += y\n>>> print(x)",
      options: ["10", "15", "20", "25"],
      answer: "15",
    },
    {
      question: "Which of the following is a built-in function in Python?",
      options: ["range", "random", "choice", "all of the above"],
      answer: "all of the above",
    },
    {
      question: "What is the correct syntax for a for loop in Python?",
      options: [
        "for (i = 0; i < 10; i++)",
        "for i in range(10)",
        "for i in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
        "for i in (0, 1, 2, 3, 4, 5, 6, 7, 8, 9)",
      ],
      answer: "for i in range(10)",
    },
  ];
  const [questions, setQuestions] = useState(temp);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [step, setStep] = useState(0);

  const onContiue = (e) => {
    let newQ = questions.map((q, idx) =>
      e.question === q.question ? { ...q, userAnswer: e.userAnswer } : q
    );
    setQuestions(newQ);
    if (!e.isLast) {
      setStep((prev) => prev + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const onBack = (e) => {
    setStep((prev) => prev - 1);
  };

  const nextPage = () => setPageStep(pageStep + 1);
  const beginTest = () => {
    console.log("Test");
  };
  const onInitializeTest = async (e) => {
    let payload = {
      role: userDetails.role,
      skill: formState.skill,
      _id: userDetails._id,
    };
    console.log(payload);
    setPageStep(pageStep + 1);
    // let initialTestData = axios.post();
  };

  const layout = <div className="hero min-h-[50%] text-blue-700"></div>;

  const pages = [
    <div className="flex flex-col justify-around h-[60%] max-w-lg text-center">
      <h1 className="text-4xl font-bold">Hello {userDetails.firstName}!</h1>
      <span className="py-6 text-2xl">
        Welcome to CrackThatInterview AI Testing Portal
      </span>
      <span className="py-6 text-xl">
        You will have 10 questions for 30 mins based on your choice of test.
      </span>
      <button
        className="btn bg-white text-blue-700 hover:bg-blue-700 hover:text-white hover:border-2 hover:border-white "
        onClick={nextPage}
      >
        Get Started
      </button>
    </div>,

    <div className="flex flex-col justify-around h-[60%] max-w-lg text-center">
      <h1 className="text-5xl font-bold">Hello {userDetails.firstName}!</h1>
      <span className="py-6 text-2xl">
        Pick a technical skill you'd love to test yourself.
      </span>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text text-blue-700">
            Pick a technical skill you'd love to test yourself.
          </span>
        </label>

        <select
          name="skill"
          value={formState.skill}
          onChange={handleFieldChange}
          id="skill"
          className="select select-bordered bg-blue-700 text-white"
        >
          <option disabled>Pick one</option>
          {testsOfInterest.map((test, idx) => (
            <option key={idx} value={test.toLowerCase()}>
              {test}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="btn bg-white mt-4 text-blue-700 hover:bg-blue-700 hover:text-white hover:border-2 hover:border-white"
          onClick={onInitializeTest}
        >
          Let's go!
        </button>
      </div>
    </div>,
    <div className="flex flex-col justify-around h-[60%] max-w-lg text-center">
      <h1 className="text-4xl font-bold">
        Get Ready, {userDetails.firstName}!
      </h1>
      <span className="py-6 text-xl">
        Read the following instructions before starting the test.
      </span>
      <div className="px-6">
        <ul className="text-left list-disc">
          <li>
            Before starting the test, ensure that you have a stable internet
            connection and a device that is compatible with the test platform.
          </li>
          <li>
            Allocate your time wisely. Pay attention to the time limit and try
            to evenly distribute your time among the questions.
          </li>
          <li>
            Double-check your answers before submitting. Take a few minutes at
            the end to review your responses and make sure you haven't missed
            anything.
          </li>
          <li>
            Don't get too hung up on difficult questions. If you encounter a
            question that you are unsure of, move on and come back to it later
            if you have time.
          </li>
        </ul>
      </div>
      <button
        className="btn bg-white mt-4 text-blue-700 hover:bg-blue-700 hover:text-white hover:border-2 hover:border-white"
        onClick={beginTest}
      >
        Start Test
      </button>
    </div>,
  ];

  return (
    <div className="max-w-lg border-blue-700 border-2 p-4 rounded-lg bg-blue-700 text-white mx-auto">
      {pages[pageStep]}
    </div>
  );
};
// Questions per exam 20
// Questions Like
//
