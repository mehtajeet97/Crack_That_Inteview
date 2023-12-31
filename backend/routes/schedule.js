import Router from "express";
const router = Router();
import xss from "xss";

import users from "../data/users.js";
import { idCheck, isValidObjectId, sendError } from "../helpers.js";

router
  .route("/")
  .get(async (req, res) => {
    // Get all interviewers for student to select | UI : SchedulingScreen1.js
    const interviewerList = await users.getAllInterviewers();

    if (!interviewerList) {
      res.status(400).json("there are no users");
    } else {
      res.status(200).json(interviewerList);
    }
  })
  .post(async (req, res) => {
    // Get the available slots by providing id of interviewer selected | UI : SchedulingScreen2.js
    try {
      //Validation
      let userID = xss(req.body.interviewerId); // Sanitize the input

      if (isValidObjectId(userID)) {
        const userSlots = await users.getAvailableSlots(userID);
        res.status(200).json(userSlots); //Output : availableslots of provided interviewer
      } else {
        res.status(400).json(sendError("Invalid UserID"));
      }
    } catch (e) {
      res.status(500).json(sendError(JSON.stringify(e)));
    }
  });
router
  .route("/:id")
  .get(async (req, res) => {
    // Get all interviewers for student to select | UI : SchedulingScreen1.js
    let userID = idCheck(req.params.id);
    const past = await users.getPastInterviews(userID);
    if (!past) {
      res.status(400).json("there are no users");
    } else {
      res.status(200).json(past);
    }
  })
  .post(async (req, res) => {
    try {
      let userID = idCheck(req.params.id);
      let payload = req.body;
      let interviewID = xss(idCheck(payload.interview));
      const slots = await users.moveToPast(userID, interviewID); //returns {success:true} or error
      if (slots.success) {
        console.log("Success");
        res.status(200).json("Updated Successfully!");
      } else {
        res.status(400).json(sendError("Update Unsuccesful!"));
      }
    } catch (e) {
      res.status(500).json(sendError(e)); //SendError necessary for toast
    }
  });

export default router;
