import Router from "express";
import users from "../data/users.js";
import * as helpers from "../helpers.js";

const router = Router();

router
  .route("/")
  .get(async (req, res) => {
    //todo only admin can get
    const allUsers = await users.getAllUsers();

    if (!allUsers) {
      res.status(400).json(helpers.sendError("there are no users"));
    } else {
      res.status(200).json(helpers.sendResponse(allUsers));
    }
  })
  .post(async (req, res) => {
    //todo any one
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
      data.role = helpers.stringCheck(data.role);
      data.organization = helpers.stringCheck(data.organization);
      // data.profilePhoto = helpers.stringCheck(data.profilePhoto);
      // data.blogs = helpers.arrayCheck(data.blogs);
      // data.articlesRead = helpers.arrayCheck(data.articlesRead);
      // data.pastInterviews = helpers.arrayCheck(data.pastInterviews);
      // data.upcomingInterviews = helpers.arrayCheck(data.upcomingInterviews);

      const addUser = await users.createUser(
        data.firstName,
        data.lastName,
        data.age,
        data.email,
        data.password,
        data.phoneNumber,
        data.resume,
        data.skills,
        data.organization,
        data.role
      );

      res.status(200).json(helpers.sendResponse("added user successFully"));
    } catch (e) {
      res.status(500).json(helpers.sendError(e));
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    //todo any one
    try {
      req.params.id = helpers.idCheck(req.params.id);
      const user = await users.getUserById(req.params.id);
      delete user.password;
      if (user.isBanned) {
        throw "USER IS BANNED";
      }
      res.status(200).json(helpers.sendResponse(user));
    } catch (e) {
      res.status(400).json(helpers.sendError(e));
    }
  })
  .delete(async (req, res) => {
    //todo  only an admin can delete the user
    // req.params.id = helpers.idCheck(req.params.id);
    // try {
    //   const deletionInfo = await users.removeUser(req.params.id);
    //   if (deletionInfo.lastErrorObject.n === 0) {
    //     throw `Could not delete user with id of ${id}`;
    //   }
    //   let mssg = `deleted user with id ${id}`;
    //   res.status(200).json(mssg);
    // } catch (e) {
    //   res.status(400).json(e);
    // }
  })
  .put(async (req, res) => {
    //todo
    //only an user and an admin can change the user details
    // req.params.id = helpers.idCheck(req.params.id);
  })
  .patch(async (req, res) => {
    try {
      const data = req.body;
      const errors = [];
      if (req.headers["reqtype"] == "premium-request") {
        data.method = "premium-request";

        try {
          req.params.id = helpers.idCheck(req.params.id);
        } catch (e) {
          errors.push(e);
        }
        try {
          data.data = helpers.stringCheck(data.data);
        } catch (e) {
          errors.push(e);
        }
        try {
          data.status = helpers.stringCheck(data.status);
        } catch (e) {
          errors.push(e);
        }
      } else {
        if (!data || Object.keys(data).length === 0) {
          return "error while liking the blog";
        }
        try {
          req.params.id = helpers.idCheck(req.params.id);
        } catch (e) {
          errors.push(e);
        }
        try {
          data.blogId = helpers.idCheck(req.body.blogId);
        } catch (e) {
          errors.push(e);
        }
      }
      if (errors.length > 0) throw errors;

      const updatedUser = await users.patchUser(req.params.id, data);
      if (updatedUser.error) {
        throw updatedUser.data;
      }

      res.status(200).json(helpers.sendResponse(updatedUser));
    } catch (e) {
      res.status(400).json(helpers.sendError(e));
    }
  });

export default router;
