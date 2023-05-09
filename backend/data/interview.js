import { interviews } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import { idCheck, dateCheck, arrayCheck, stringCheck } from "../helpers.js";

const date = new Date();

const createInterview = async (
  interviewee,
  interviewer,
  interviewDate,
  interviewStatus
  // intervieweeRemarks,
  // interviewerRemarks
) => {
  if (!interviewee) throw "Student Name must be provided";
  if (!interviewer) throw "Interviewer Name must be provided";
  if (!interviewDate) throw "Interview Date must be provided";
  // if (!intervieweeRemarks) throw "Remarks must be provided";
  // if (!interviewerRemarks) throw "Remarks Number must be provided";
  stringCheck(interviewee);
  interviewee = interviewee.trim();
  stringCheck(interviewer);
  interviewer = interviewer.trim();
  // dateCheck(interviewDate);
  // interviewDate = interviewDate.trim();
  // arrayCheck(intervieweeRemarks);
  // arrayCheck(interviewerRemarks);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let interview = {};
  interview = {
    interviewee,
    interviewer,
    interviewLink: "Zoom Link",
    interviewDate,
    recordingLink: "Recording Link",
    intervieweeRemarks: [],
    interviewerRemarks: [],
    createdAt: `${month}/${day}/${year}`,
    updatedAt: `${month}/${day}/${year}`,
    interviewStatus,
  };
  const interviewCollection = await interviews();
  const findInterview = await interviewCollection.findOne({
    interviewee,
    interviewer,
    interviewDate,
  });
  if (findInterview) {
    return { success: false };
  } else {
    const insertInterview = await interviewCollection.insertOne(interview);
    if (!insertInterview.acknowledged || !insertInterview.insertedId)
      throw "Cannot add interview";
    const newId = insertInterview.insertedId.toString();
    interview._id = newId;
    return { success: true };
  }
};

const getInterviewById = async (id) => {
  if (!id) throw "You should enter an Id";
  idCheck(id);
  id = id.trim();
  const interviewCollection = await interviews();

  let listOfInterviews = await interviewCollection.findOne({
    _id: new ObjectId(id),
  });
  if (listOfInterviews === null)
    throw "There is no interview with the Id mentioned";
  listOfInterviews._id = listOfInterviews._id.toString();
  return listOfInterviews;
};

const getAllInterviews = async () => {
  const interviewCollection = await interviews();
  let listOfInterviews = await interviewCollection.find({}).toArray();
  listOfInterviews = listOfInterviews.map((element) => {
    element._id = element._id.toString();
    return element;
  });
  return listOfInterviews;
};

const removeInterview = async (id) => {
  if (!id) throw "You should enter an Id";
  idCheck(id);
  id = id.trim();
  if (!ObjectId.isValid(id)) throw "The Id is not valid";
  const interviewCollection = await interviews();
  const deletedInterview = await interviewCollection.findOneAndDelete({
    _id: new ObjectId(id),
  });
  if (deletedInterview.lastErrorObject.n === 0) {
    throw `The Interview with Id of ${id} could not be deleted`;
  }
  return `Interview with ${id} has been successfully deleted!`;
};

const addInterviewRemarks = async (id, remarks) => {
  if (!id) throw "You should enter an Id";
  idCheck(id);
  id = id.trim();
  const interviewCollection = await interviews();
  let interview = await interviewCollection.findOne({
    _id: new ObjectId(id),
  });
  if (!interview) throw "Interview is not valid";
  let updateRemarks = { ...interview, interviewerRemarks: remarks };
  const updatedInterview = await interviewCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: updateRemarks },
    { returnDocument: "after" }
  );
  return updatedInterview;
};

export default {
  createInterview,
  getInterviewById,
  getAllInterviews,
  removeInterview,
  addInterviewRemarks,
};
