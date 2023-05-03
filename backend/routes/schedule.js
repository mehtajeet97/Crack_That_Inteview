import Router from "express";
const router = Router();

import users from "../data/users.js";
import * as helpers from "../helpers.js";

router.route("/").get(async (req, res) => {
  //Code for get all interviewers for student to select
  const interviewerList = await users.getAllInterviewers();

  if (!interviewerList) {
    res.status(400).json(helpers.sendError("there are no users"));
  } else {
    res.status(200).json(helpers.sendResponse("ok", interviewerList));
  }
});

router
  .route("/:id")
  .post(async (req, res) => {
    //Code to get the available slots by providing id of interviewer selected
    try {
      //Validation
      req.params.id = helpers.idCheck(req.params.id);
      const userSlots = await users.getAvailableSlots(req.params.id);

      res.status(200).json(userSlots);
    } catch (e) {
      console.log(e);
      res.status(400).json(helpers.sendError(e));
    }
  })
  .put(async (req, res) => {
    //Code to update the available slots for interviewer
    try {
      //Validation
      let payload = req.body;
      payload.id = helpers.idCheck(payload.id);
      //payload.slots = helpers.checkSlots(payload.slots)

      const slots = updateAvailableSlots(payload.id, payload.slots);
      if (slots.success) {
        res.status(200).json("Updated Successfully!");
      } else {
        throw `Update unsuccessful!`;
      }
    } catch (e) {
      console.log(e);
      res.status(400).json(helpers.sendError(e));
    }
  });

export default router;
