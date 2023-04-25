import { useEffect, useState } from "react";

export const TestResult = ({ result }) => {
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const calculateScore = (questions) => {
    let totalCorrectAns = questions.reduce(
      (sum, curr) => (curr.answer === curr.userAnswer ? sum + 1 : sum),
      0
    );
    setScore(totalCorrectAns);
    console.log(score);
  };

  useEffect(() => {
    calculateScore(result);
  }, []);

  return (
    <div className="px-6 py-4 w-1/2 mx-auto rounded-lg bg-lime-500">
      <span className="block font-bold text-xl mb-2">
        Congratulations! You have scored {score} / {result.length}!
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

      <button className="px-4 py-2 ml-4 bg-blue-400 rounded-lg font-semibold">
        Take Another
      </button>
      {showResult &&
        result.map((question, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-4 bg-white px-6 py-4 rounded-lg shadow-lg my-4"
          >
            <span className="block text-center">Question {idx + 1}</span>

            <span className="block">{question.question}</span>
            {question.options.map((option, oidx) => {
              return (
                <div
                  key={oidx}
                  id={`option${oidx}`}
                  className={`flex items-center justify-between p-3 w-full bg-yellow-50 ${
                    option === question.userAnswer && option !== question.answer
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
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
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
        ))}
    </div>
  );
};
