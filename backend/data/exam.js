import { exams } from "../config/mongoCollections";

const initiateExam = async (payload) => {
  let { _id, skill } = payload;

  let examsCollection = await exams();
};
