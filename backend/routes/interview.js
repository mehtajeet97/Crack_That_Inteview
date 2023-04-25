import Router from "express";
import { interviewData as interview } from "../data/index.js";
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
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).send("the input fields are empty");
    }
    try {
      data.interviewee = helpers.idCheck(data.interviewee);
      data.interviewer = helpers.idCheck(data.interviewer);

      const addInterview = await interview.createInterview(
        data.interviewer,
        data.interviewee,
        [{ "skill knowledgs": "good", rating: 0 }],
        [{ "level of difficuly": "good" }],
        "04/11/2022"
      );
      res.status(200).json(addInterview);
    } catch (e) {
      res.status(400).send("problem adding the interviews");
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    req.params.id = helpers.idCheck(req.params.id);
    try {
      const interviews = await interview.getInterviewById(req.params.id);
      res.send(interviews);
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
  });
export default router;
