import { ObjectId } from "mongodb";
import { questions } from "../config/mongoCollections";
import { isValidObjectId } from "../helpers";

export const getQuestionById = async (id) => {
  if (!isValidObjectId) {
    return null;
  }

  let questionsCollection = await questions();
  let question = questionsCollection.findOne({ _id: new ObjectId(id) });

  if (!question) {
    return null;
  }
  question._id = question._id.toString();
  return question;
};

export const getAllQuestions = async () => {
  let questionsCollection = await questions();
  let questions = questionsCollection.find({}).toArray();

  return questions;
};

export const getQuestionsByIds = (ids) => {
  console.log(ids);
};

export const getQuestionsBySkill = async (skill, limit = 10) => {
  let questionsCollection = await questions();
  let questions = questionsCollection.find({ skill }).toArray();
  if (!questions) {
    return null;
  }
  questions = questions.map((question) => {
    question._id = question._id.toString();
  });

  return questions;
};
