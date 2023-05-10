import { useEffect, useState } from "react";

export const QuestionCard = ({
  questionInfo,
  qNo,
  handleBack,
  handleContinue,
  isFirst,
  isLast,
  setExamState,
}) => {
  const { question, options, userAnswer } = questionInfo;
  const [state, setState] = useState({
    isDisabled: !userAnswer,
    userAnswer: userAnswer,
  });

  const onOptionSelect = (e) => {
    const id = e.target.id.charAt(e.target.id?.length - 1);
    const optionSelected = document.getElementById(question + id);
    optionSelected.checked = true;
    setState({ isDisabled: false, userAnswer: optionSelected?.value });
  };

  const onContiue = () => {
    handleContinue({ question, userAnswer: state.userAnswer, isLast });
  };

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col gap-4 bg-white text-blue-700 px-6 py-4 rounded-lg shadow-lg min-w-[50%]">
        <div
          className={`flex items-center ${
            isFirst ? "justify-center" : "justify-between"
          }`}
        >
          {!isFirst && (
            <button
              className="cursor-pointer pr-3 text-3xl"
              onClick={handleBack}
            >
              ←
            </button>
          )}
          <span className="block font-bold">Question {qNo}</span>
          {!isFirst && <span className="pr-6"></span>}
        </div>
        <span className="block font-bold">{question}</span>
        {options.map((option, idx) => {
          return (
            <div
              key={idx}
              id={`option${idx}`}
              className="flex items-center p-3 w-full bg-blue-100 rounded-md cursor-pointer"
              onClick={onOptionSelect}
            >
              <input
                type="radio"
                id={question + idx}
                value={option}
                name={`question${qNo}`}
                className="radio radio-primary radio-xs"
                defaultChecked={option === userAnswer}
              />
              <label
                htmlFor={`question${qNo}`}
                className="ml-2 cursor-pointer text-sm font-bold text-blue-700"
                id={`label${idx}`}
              >
                {option}
              </label>
            </div>
          );
        })}
        <button
          className="bg-blue-400 disabled:bg-blue-100 rounded-md text-white px-3 py-2 text-sm"
          onClick={onContiue}
          disabled={state.isDisabled}
        >
          {isLast ? "Submit" : "Continue"}
        </button>
      </div>
    </div>
  );
};
