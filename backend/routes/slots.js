import Router from "express";
const router = Router();

import users from "../data/users.js";
import { idCheck, isValidObjectId, sendError } from "../helpers.js";

router.route("/").post(async (req, res) => {
  try {
    //Validation
    let payload = req.body;
    if (isValidObjectId(payload._id)) {
      const slots = await users.updateAvailableSlots(
        payload._id,
        payload.availableSlots
      ); //returns {success:true} or error
      if (slots.success) {
        res.status(200).json("Updated Successfully!");
      } else {
        res
          .status(400)
          .json(
            sendError(
              "You have an entry for the same date & timeslot. Kindly try again"
            )
          );
      }
    } else {
      res.status(400).json(sendError("Invalid UserID provided!"));
    }
  } catch (e) {
    res.status(500).json(sendError(e)); //SendError necessary for toast
  }
});

router.route("/:id").get(async (req, res) => {
  // Get all interviewers for student to select | UI : SchedulingScreen1.js
  let userID = idCheck(req.params.id);
  const upcoming = await users.getUpcomingInterviews(userID);
  if (!upcoming) {
    res.status(400).json("there are no users");
  } else {
    res.status(200).json(upcoming);
  }
});
export default router;
