import Router from "express";
const router = Router();
import { ObjectId } from "mongodb";

import users from "../data/users.js";
import { isValidObjectId, sendError } from "../helpers.js";

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
        res.status(400).json(sendError("Interview slots could not be added"));
      }
    } else {
      res.status(400).json(sendError("Invalid UserID provided!"));
    }
  } catch (e) {
    res.status(500).json(sendError(e)); //SendError necessary for toast
  }
});
export default router;
