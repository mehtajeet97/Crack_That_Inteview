import { ObjectId } from "mongodb";
import { exams } from "../config/mongoCollections.js";
import { isValidObjectId } from "../helpers.js";
import { getQuestionsBySkill } from "./questions.js";

export const initiateExam = async (payload) => {
  let { userId, skill, role } = payload;
  let questions = await getQuestionsBySkill(skill);

  let onlyQuestions = questions.map((question) => {
    let { answer, ...rest } = question;
    return rest;
  });

  payload = {
    ...payload,
    user: userId,
    skill,
    role,
    questions,
    testStartedAt: new Date(),
    duration: 30,
    testEndedAt: new Date(),
    isPremium: false,
    isCompleted: false,
    status: "active",
    userRecordedAnswers: [],
  };

  let examsCollection = await exams();
  let examInfo = await examsCollection.insertOne(payload);

  if (!examInfo.acknowledged || !examInfo.insertedId)
    throw "Cannot initiate exam";
  payload.questions = onlyQuestions;
  payload._id = examInfo.insertedId.toString();
  return payload;
};

export const getExamInfoById = async (examId, withAnswer = false) => {
  if (isValidObjectId(examId)) {
    let examsCollection = await exams();
    let examInfo = await examsCollection.findOne({
      _id: new ObjectId(examId),
    });
    if (examInfo === null) {
      throw "No exam found";
    }
    if (!withAnswer) {
      examInfo.questions = examInfo.questions.map((question) => {
        let { answer, ...rest } = question;
        return rest;
      });
    }
    return examInfo;
  } else {
    throw "Exam id not found";
  }
};

export const getExamInfoByIdWithAnswer = async (examId) => {
  if (isValidObjectId(examId)) {
    let examsCollection = await exams();
    let examInfo = await examsCollection.findOne({
      _id: new ObjectId(examId),
    });
    if (examInfo === null) {
      throw "No exam found";
    }
    return examInfo;
  } else {
    throw "Exam id not found";
  }
};

export const concludeExam = async (payload) => {
  let { _id, ...rest } = payload;

  let examsCollection = await exams();
  let initialExamInfo = await getExamInfoByIdWithAnswer(_id);
  payload.questions = initialExamInfo.questions;
  let examInfo = await examsCollection.findOneAndUpdate(
    {
      _id: new ObjectId(_id),
    },
    { $set: rest },
    { returnDocument: "after" }
  );

  if (examInfo === null) throw `Could not complete exam`;
  return examInfo.value;
};
