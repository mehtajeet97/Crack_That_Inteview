import { useState } from "react";
import { QuestionCard } from "./QuestionCard.js";
import { TestCard } from "./TestCard.js";
import { TestResult } from "./TestResult.js";

export const TestYourself = ({ userDetails }) => {
  userDetails = {
    name: "Dhruv",
    points: 100,
    recentExam: { skill: "Python", score: 100, star: 5 },
  };

  const greetMessage = "Congratulations! 🎉🥺";

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

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="px-6 py-4 rounded-lg bg-lime-500">
        <div className="font-bold text-xl mb-2">Hi, {userDetails.name}!</div>
        <p className="text-gray-700 text-base">{greetMessage}</p>
        <p>
          You score {userDetails.recentExam.score} in your recent{" "}
          {userDetails.recentExam.skill}!
        </p>
      </div>
      <div className="px-6 py-4 rounded-lg text-white bg-purple-700">
        <span className="font-bold text-xl mb-2 block">
          Take a test based on your interests!
        </span>
        <div className="flex align-center justify-center flex-wrap gap-4">
          {testsOfInterest.map((test, idx) => (
            <button
              key={idx}
              className="bg-yellow-400 rounded-lg px-4 py-2 text-black font-semibold"
            >
              {test}
            </button>
          ))}
        </div>
      </div>
      {!isSubmitted &&
        questions.map((qData, qNo) => (
          <QuestionCard
            key={qNo}
            questionData={qData}
            qNo={qNo + 1}
            handleContinue={onContiue}
            handleBack={onBack}
            isLast={questions.length === qNo + 1}
            isFirst={qNo === 0}
          ></QuestionCard>
        ))[step]}
      {isSubmitted && <TestResult result={questions}></TestResult>}
    </div>
  );
};
// Questions per exam 20
// Questions Like
//
