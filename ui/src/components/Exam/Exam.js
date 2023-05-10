import axios from "axios";
import { useEffect, useState, useContext } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.js";
import { TestResult } from "./TestResult.js";
import { QuestionCard } from "./QuestionCard.js";
import { OngoingExam } from "./OngoingExam.js";

export const Exam = () => {
  let [examInfo, setExamInfo] = useState({});
  let [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const { state, updateState } = useContext(AuthContext);
  const [isCompleted, setIsCompleted] = useState(false);

  const getExamInfo = async (examId) => {
    let examInfoURL = `http://localhost:4000/exams/${examId}`;

    let options = {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    };
    try {
      let {
        data: { data },
      } = await axios.get(examInfoURL, options);
      setExamInfo(data);
      setIsCompleted(data.isCompleted);
    } catch (e) {
      if (e.response.data.message === "Invalid exam Id") {
        navigate("/test-yourself");
      }
    }
  };

  useEffect(() => {
    let examId = params.examId;
    getExamInfo(examId);
  }, []);
  return isCompleted ? (
    <TestResult examInfo={examInfo} />
  ) : (
    <OngoingExam examInfo={examInfo} />
  );
};
