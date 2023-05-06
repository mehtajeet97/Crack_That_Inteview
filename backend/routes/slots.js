import Router from "express";
const router = Router();

import users from "../data/users.js";
import { idCheck, sendError } from "../helpers.js";

router.route("/").post(async (req, res) => {
  // Update the available slots for interviewer | UI : AvailableSlots.js
  try {
    //Validation
    let payload = req.body;
    idCheck(payload._id);

    const slots = await users.updateAvailableSlots(
      payload._id,
      payload.availableSlots
    ); //returns {success:true} or error
    if (slots.success) {
      res.status(200).json("Updated Successfully!");
    } else {
      throw `Interview slots could not be added`;
    }
  } catch (e) {
    res.status(400).json(sendError(e)); //SendError necessary for toast
  }
});
export default router;
