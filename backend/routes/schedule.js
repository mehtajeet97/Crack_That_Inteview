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

export default router;
