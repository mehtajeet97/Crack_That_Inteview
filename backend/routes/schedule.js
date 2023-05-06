import Router from "express";
const router = Router();

import users from "../data/users.js";
import { idCheck } from "../helpers.js";

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
      let userID = idCheck(req.body.interviewerId);

      const userSlots = await users.getAvailableSlots(userID);
      res.status(200).json(userSlots); //Output : availableslots of provided interviewer
    } catch (e) {
      res.status(400).json(e);
    }
  });

router.route("/:id").post(async (req, res) => {
  // Update the upcoming interviews for user | UI : SchedulingScreen2.js | 2 calls in the same function
  try {
    //Validation
    req.params.id = idCheck(req.params.id);
    let payload = req.body;

    const slots = await users.updateUpcomingInterview(req.params.id, payload); //returns {success:true} or error
    if (slots.success) {
      res.status(200).json("Updated Successfully!");
    } else {
      throw `Interview already scheduled!`;
    }
  } catch (e) {
    res.status(400).json(sendError(e)); //SendError necessary for toast
  }
});
export default router;
