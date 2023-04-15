import Router from "express";
import users from "../data/users.js";
import * as helpers from "../helpers.js";

const router = Router();

router
  .route("/")
  .get(async (req, res) => {
    const allUsers = await users.getAllUsers();
    if (!allUsers) {
      res.status(400).json("there are no users");
    } else {
      res.status(200).json(allUsers);
    }
  })
  .post(async (req, res) => {
    let data = req.body;
    try {
      data.firstName = helpers.stringCheck(data.firstName);
      data.lastName = helpers.stringCheck(data.lastName);
      data.age = helpers.ageCheck(data.age);
      data.email = helpers.stringCheck(data.email);
      data.password = helpers.passwordCheck(data.password);
      data.phoneNumber = helpers.phoneNumberCheck(data.phoneNumber);
      data.resume = helpers.stringCheck(data.resume);
      data.skills = helpers.arrayCheck(data.skills);
      data.tags = helpers.arrayCheck(data.tags);
      data.profilePhoto = helpers.stringCheck(data.profilePhoto);
      data.blogs = helpers.arrayCheck(data.blogs);
      data.articlesRead = helpers.arrayCheck(data.articlesRead);
      data.pastInterviews = helpers.arrayCheck(data.pastInterviews);
      data.upcomingInterview = helpers.arrayCheck(data.upcomingInterview);
    } catch (e) {
      res.status(400).json("error with the data");
    }
    try {
      let newUser = {
        firstName: data.firstName,
        lastName: data.lastName,
        age: data.age,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        resume: data.resume,
        skills: data.skills,
        tags: data.tags,
        profilePhoto: data.profilePhoto,
        blogs: data.blogs,
        articlesRead: data.articlesRead,
        pastInterviews: data.pastInterviews,
        upcomingInterview: data.upcomingInterview,
        isPremiumUser: 0,
        userScore: 0,
        isBanned: 0,
      };
      const addUser = await users.createUser(newUser);
      res.json(addUser);
    } catch (e) {
      res.status(400).json(e);
    }
  });
router
  .route("/:id")
  .get(async (req, res) => {
    try {
      req.params.id = helpers.idCheck(req.params.id);
      const user = await users.getUserById(req.params.id);

      res.json(user);
    } catch (e) {
      console.log(e);
      res.status(400).json("error with the id");
    }
  })
  .delete(async (req, res) => {
    req.params.id = helpers.idCheck(req.params.id);

    try {
      const deletionInfo = await users.removeUser(req.params.id);

      if (deletionInfo.lastErrorObject.n === 0) {
        throw `Could not delete user with id of ${id}`;
      }
      let mssg = `deleted user with id ${id}`;
      res.status(200).json(mssg);
    } catch (e) {
      res.status(400).json(e);
    }
  });

export default router;
