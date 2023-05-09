import Router from "express";
import { interviewData as interview } from "../data/index.js";
import users from "../data/users.js";
import * as helpers from "../helpers.js";
const router = Router();

router
  .route("/")
  .get(async (req, res) => {
    const interviews = await interview.getAllInterviews();
    if (!interviews) {
      res.status(400).send("there are no interviews");
    } else {
      res.status(200).json(interviews);
    }
  })
  .post(async (req, res) => {
    let data = req.body;
    let payloadDate = data.payload.date;
    let payloadtimings = data.payload.timings;

    try {
      data.userId = helpers.idCheck(data.userId);
      data.interviewerId = helpers.idCheck(data.interviewerId);

      let user = await users.getUserById(data.userId);
      let userName = user.firstName + " " + user.lastName;
      let interviewer = await users.getUserById(data.interviewerId);
      let interviewerName = interviewer.firstName + " " + interviewer.lastName;
      const addInterview = await interview.createInterview(
        userName,
        interviewerName,
        data.payload,
        "scheduled"
      );

      const interviewId = addInterview.insertedId;
      let interviewerpayload = {
        interviewid: interviewId,
        studentName: userName,
        date: payloadDate,
        timings: payloadtimings,
      };
      let studentpayload = {
        interviewid: interviewId,
        interviewerName: interviewerName,
        date: payloadDate,
        timings: payloadtimings,
      };
      await users.updateUpcomingInterview(data.userId, studentpayload);
      await users.updateUpcomingInterview(
        data.interviewerId,
        interviewerpayload
      ); //returns {success:true} or error
      await users.removeAvailableSlots(data.interviewerId, data.payload);

      if (addInterview.acknowledged === true) {
        res.status(200).json("Created Interview");
      } else {
        res
          .status(400)
          .json(
            helpers.sendError("Interview already created! Please try again")
          );
      }
    } catch (e) {
      res.status(500).json(helpers.sendError(e)); //SendError necessary for toast
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      req.params.id = helpers.idCheck(req.params.id);
      const interviews = await interview.getInterviewById(req.params.id);
      res.status(200).send(interviews);
    } catch (e) {
      res.status(400).send(e);
    }
  })
  .delete(async (req, res) => {
    req.params.id = helpers.idCheck(req.params.id);

    try {
      const deletionInfo = await interview.removeInterview(req.params.id);

      if (deletionInfo.lastErrorObject.n === 0) {
        throw `Could not delete interview with id of ${id}`;
      }
      let mssg = `deleted user with id ${id}`;
      res.status(200).json(mssg);
    } catch (e) {
      res.status(400).json(e);
    }
  })
  .patch(async (req, res) => {
    try {
      let remarks = req.body;
      const updatedRemarks = await interview.addInterviewRemarks(
        req.params.id,
        remarks
      );
      res.status(200).json(updatedRemarks);
    } catch (e) {
      res.status(400).json(e);
    }
  });

export default router;
