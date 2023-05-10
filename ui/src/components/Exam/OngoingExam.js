import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuestionCard } from "./QuestionCard.js";
import { AuthContext } from "../../context/AuthContext.js";

export const OngoingExam = ({ examInfo }) => {
  //   const questions = examInfo.questions;
  let params = useParams();
  let examId = params.examId;
  const [pageStep, setPageStep] = useState(0);
  const [examState, setExamState] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [questionsCard, setQuestionsCard] = useState([]);
  const { state, updateState } = useContext(AuthContext);
  let navigate = useNavigate();

  const getExamInfo = async (examId) => {
    let examInfoURL = `http://localhost:4000/exams/${examId}`;

    try {
      let { data } = await axios.get(examInfoURL, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      setQuestions(data.data.questions);
      setExamState(data.data);
    } catch (e) {
      state.triggerToast(e.response.data.message, "error");
      navigate("/feed");
    }
  };

  const handleBack = () => {
    if (pageStep > 0) {
      setPageStep(pageStep - 1);
    }
  };

  const handleContinue = async (data) => {
    let { isLast } = data;
    setQuestions(
      questions.map((question) => {
        if (question.question === data.question) {
          return { ...question, userAnswer: data.userAnswer };
        } else {
          return question;
        }
      })
    );
    if (pageStep < questions.length - 1 && !isLast) {
      setPageStep(pageStep + 1);
    }
    if (isLast) {
      let payload = examState;
      payload = {
        ...payload,
        userRecordedAnswers: questions,
        testEndedAt: new Date(),
        isCompleted: true,
        status: "completed",
      };

      let examCompletedURL = `http://localhost:4000/exams/${examId}`;
      try {
        let { data } = axios.put(examCompletedURL, payload, {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        });
        state.triggerToast("Exam completed", "success");
        navigate("/feed");
      } catch (e) {
        state.triggerToast("Faced some issue. Log in again.", "error");
        console.log(e);
      }
    }
  };

  useEffect(() => {
    getExamInfo(examId);
  }, []);

  return (
    <div className="flex flex-col justify-around h-[60%] mx-auto max-w-lg mt-20 text-center">
      {questions?.length > 0 && (
        <QuestionCard
          key={pageStep}
          questionInfo={questions[pageStep]}
          qNo={pageStep + 1}
          handleBack={handleBack}
          handleContinue={handleContinue}
          isFirst={pageStep === 0}
          isLast={pageStep === questions.length - 1}
          setExamState={setExamState}
        />
      )}
    </div>
  );
};
