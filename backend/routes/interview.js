import Router from "express";
const router = Router();
import { interviewData } from "../data/index.js";
import * as helpers from "../helpers.js";

router
  .route("/")
  .get(async (req, res) => {
    try {
      const interviewList = await interviewData.getAllInterviews();
      res.json(interviewList);
    } catch (e) {
      res.status(400).json({ error: e });
    }
  })
  .post(async (req, res) => {
    let interviewInfo = req.body;
    if (!interviewInfo || Object.keys(interviewInfo).length === 0) {
      return res
        .status(400)
        .json({ error: "There are no fields in the request body" });
    }
    try {
      interviewInfo.interviewee = helpers.stringCheck(
        interviewInfo.interviewee
      );
      interviewInfo.interviewer = helpers.stringCheck(
        interviewInfo.interviewer
      );
      interviewInfo.interviewDate = helpers.ageCheck(
        interviewInfo.interviewDate
      );
      interviewInfo.intervieweeRemarks = helpers.stringCheck(
        interviewInfo.intervieweeRemarks
      );
      interviewInfo.interviewerRemarks = helpers.passwordCheck(
        interviewInfo.interviewerRemarks
      );
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      let newInterview = await interviewData.createInterview(
        interviewInfo.interviewee,
        interviewInfo.interviewer,
        interviewInfo.interviewDate,
        interviewInfo.intervieweeRemarks,
        interviewInfo.interviewerRemarks
      );
      res.json(newInterview);
    } catch (e) {
      res.status(400).json({ error: e });
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      req.params.id = helpers.idCheck(req.params.id);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      let interview = await interviewData.getInterviewById(req.params.id);
      res.json(interview);
    } catch (e) {
      res.status(404).json({ error: "Interview not found" });
    }
  })
  .delete(async (req, res) => {
    try {
      req.params.id = helpers.idCheck(req.params.id);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      let deletedInterview = await interviewData.removeInterview(req.params.id);
      res.json(deletedInterview);
    } catch (e) {
      res.status(404).json({ error: "Interview not found" });
    }
  });

export default router;
