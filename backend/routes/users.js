import { Router } from "express";
const router = Router();
import { userData } from "../data/index.js";
import * as helpers from "../helpers.js";

router
  .route("/")
  .get(async (req, res) => {
    try {
      const userList = await userData.getAllUsers();
      res.json(userList);
    } catch (e) {
      res.status(400).json({ error: e });
    }
  })
  .post(async (req, res) => {
    let userInfo = req.body;
    if (!userInfo || Object.keys(userInfo).length === 0) {
      return res.status(400).json({ error: "There are no fields in the request body" });
    }
    try {
      userInfo.firstName = helpers.stringCheck(userInfo.firstName);
      userInfo.lastName = helpers.stringCheck(userInfo.lastName);
      userInfo.age = helpers.ageCheck(userInfo.age);
      userInfo.email = helpers.stringCheck(userInfo.email);
      userInfo.password = helpers.passwordCheck(userInfo.password);
      userInfo.phoneNumber = helpers.phoneNumberCheck(userInfo.phoneNumber);
      userInfo.resume = helpers.stringCheck(userInfo.resume);
      userInfo.skills = helpers.arrayCheck(userInfo.skills);
      userInfo.tags = helpers.arrayCheck(userInfo.tags);
      userInfo.profilePhoto = helpers.stringCheck(userInfo.profilePhoto);
      userInfo.blogs = helpers.arrayCheck(userInfo.blogs);
      userInfo.articlesRead = helpers.arrayCheck(userInfo.articlesRead);
      userInfo.pastInterviews = helpers.arrayCheck(userInfo.pastInterviews);
      userInfo.upcomingInterviews = helpers.arrayCheck(userInfo.upcomingInterviews);
      userInfo.isPremiumUser = helpers.booleanCheck(userInfo.isPremiumUser);
      userInfo.userScore = helpers.scoreCheck(userInfo.userScore);
      userInfo.isBanned = helpers.booleanCheck(userInfo.isBanned);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      let newUser = await userData.createUser(
        userInfo.firstName,
        userInfo.lastName,
        userInfo.age,
        userInfo.email,
        userInfo.password,
        userInfo.phoneNumber,
        userInfo.resume,
        userInfo.skills,
        userInfo.tags,
        userInfo.profilePhoto,
        userInfo.blogs,
        userInfo.articlesRead,
        userInfo.pastInterviews,
        userInfo.upcomingInterviews,
        userInfo.isPremiumUser,
        userInfo.userScore,
        userInfo.isBanned,
      );
      res.json(newUser);
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
      let user = await userData.getUserById(req.params.id);
      res.json(user);
    } catch (e) {
      res.status(404).json({ error: "User not found" });
    }
  })
  .delete(async (req, res) => {
    try {
      req.params.id = helpers.idCheck(req.params.id);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      let deletedUser = await userData.removeUser(req.params.id);
      res.json(deletedUser);
    } catch (e) {
      res.status(404).json({ error: "User not found" });
    }
  });

export default router;
