import xss from "xss";
import Router from "express";
import users, { updateUserBanStatus } from "../data/users.js";
import * as helpers from "../helpers.js";
import multer from "multer";
import { v4 as uuidv4, validate } from "uuid";
import fs from "fs";
import { log } from "console";

const storageConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    let uuid = uuidv4();
    req.body.tempFilePath = uuid;
    let tempFilePath = "uploads/" + uuid;
    fs.mkdirSync(tempFilePath, { recursive: true });
    cb(null, tempFilePath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

let upload = multer({ storage: storageConfig });

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
  .post(upload.single("resume"), async (req, res) => {
    let payload = req.body;

    if (payload.role === "student") {
      let file = req.file;
      let fileLocationDB = `static/${req.body.tempFilePath}/${file.originalname}`;
      payload.resume = fileLocationDB;
    }

    try {
      let validationResult = helpers.validate.register(payload);
      if (!validationResult.validationPassed) {
        res.status(400).json({ data: [], errors: validationResult.errors });
      } else {
        // Check if user with same email exists
        let user = await users.getUserByEmail(
          payload.email.trim().toLowerCase()
        );
        if (user === null) {
          const { password, ...rest } = await users.createUser(
            validationResult.data
          );
          res
            .status(200)
            .json({ message: "User registered successfully", data: rest });
        } else {
          if (payload.role === "student") {
            let fileLocationDisk = `./uploads/${req.body.tempFilePath}`;
            fs.rmSync(fileLocationDisk, { recursive: true, force: true });
          }
          if (user.error === "Invalid email provided") {
            res.status(400).json({ data: [], errors: user.error });
          } else {
            res.status(400).json({
              data: [],
              errors: "User already exists, try signing in.",
            });
          }
        }
      }
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
      const headers = req.headers;

      if (headers?.update === "banUser") {
        try {
          let userId = req.params.id;
          data.userId = userId;
          // console.log(data);
          let validationResult = helpers.validate.banStatus(data);
          // console.log(validationResult);

          if (validationResult.validationPassed) {
            let updateResult = await updateUserBanStatus(data);

            if (!updateResult) throw `Internal Server Error`;

            // let allUsers = await users.getAllUsers();
            res.status(200).json(helpers.sendResponse(updateResult));
          } else {
            res
              .status(400)
              .send(helpers.sendError(JSON.stringify(validationResult.errors)));
          }
        } catch (e) {
          res.status(500).send(helpers.sendError(JSON.stringify(e)));
        }
      } else if (req.headers["reqtype"] == "premium-request") {
        try {
          data.method = "premium-request";
          try {
            req.params.id = xss(helpers.idCheck(req.params.id));
          } catch (e) {
            errors.push(e);
          }
          try {
            data.message = xss(helpers.stringCheck(data.message));
          } catch (e) {
            errors.push(e);
          }
          try {
            data.status = xss(helpers.stringCheck(data.status));
          } catch (e) {
            errors.push(e);
          }
          if (errors.length > 0) throw errors;

          const updatedUser = await users.patchUser(req.params.id, data);
          if (updatedUser.error) {
            throw updatedUser.data;
          }
          if (updatedUser == "user not found") {
            res.status(404).json(helpers.sendError("user not found"));
          }
          res.status(200).json(helpers.sendResponse(updatedUser));
        } catch (e) {
          if (e.length) {
            res.status(400).json(helpers.sendError("bad request"));
          } else {
            res.status(500).json(helpers.sendError("internal server error"));
          }
        }
      } else if (req.headers["update"] == "premium") {
        // console.log("in user route updating premium", data);
        try {
          // if (validationResult.validationPassed) {
          if (data.role !== "admin") throw "not admin";
          if (helpers.idCheck(data.userId)) {
            let updateResult = await users.updateUserPremiumStatus(data);
            if (!updateResult) throw `Internal Server Error`;
            if (updateResult === "user not found") throw "user not found";
            res.status(200).json(helpers.sendResponse(updateResult));
          } else {
            res
              .status(400)
              .send(helpers.sendError(JSON.stringify(validationResult.errors)));
          }
        } catch (e) {
          if (e === "user not found") {
            res.status(404).json(helpers.sendError(e));
          } else if (e == "not admin") {
            res.status(401).json(helpers.sendError(e));
          } else {
            res.status(400).send(helpers.sendError(JSON.stringify(e)));
          }
        }
      } else if (req.headers["update"] === "readBlogs") {
        try {
          if (!data || Object.keys(data).length === 0) {
            return "error while liking the blog";
          }
          try {
            req.params.id = xss(helpers.idCheck(req.params.id));
          } catch (e) {
            errors.push(e);
          }
          try {
            req.body.blogTitle = xss(helpers.stringCheck(req.body.blogTitle));
          } catch (e) {
            errors.push(e);
          }
          try {
            data.blogId = helpers.idCheck(req.body.blogId);
          } catch (e) {
            errors.push(e);
          }
          if (errors.length > 0) throw errors;
          try {
            const updatedUser = await users.patchUser(req.params.id, data);
            if (updatedUser.error) {
              throw updatedUser.data;
            }
            res.status(200).json(helpers.sendResponse(updatedUser));
          } catch (e) {
            res.status(500).json(helpers.sendError("internal server error"));
          }
        } catch (e) {
          res.status(400).json(helpers.sendError("bad request"));
        }
      } else if (req.headers["update"] === "user-profile") {
        let userInfo = req.body;
        let _id = xss(req.params.id);
        let firstName = xss(req.body.firstName);
        let lastName = xss(req.body.lastName);
        let age = xss(req.body.age);
        let email = xss(req.body.email);
        let phone = xss(req.body.phone);
        let resume = xss(req.body.resume);
        let skills = req.body.skills.map((skill) => skill);
        let linkedin = xss(req.body.linkedin);
        let twitter = xss(req.body.twitter);
        let github = xss(req.body.github);
        let tags = req.body.tags.map((tag) => tag);
        let yoe = xss(req.body.yoe);
        let school = xss(req.body.school);
        let careerRole = xss(req.body.careerRole);
        let profilePhoto = xss(req.body.profilePhoto);
        let role = xss(req.body.role);
        let blogs = req.body.blogs.map((blog) => blog);
        let articlesRead = req.body.articlesRead.map((article) => article);
        let pastInterviews = req.body.pastInterviews.map((pastInt) => pastInt);
        let upcomingInterviews = req.body.upcomingInterviews.map(
          (uInt) => uInt
        );
        let availableSlots = req.body.availableSlots.map((slot) => slot);
        let createdAt = xss(req.body.createdAt);
        let updatedAt = xss(req.body.updatedAt);
        let isPremiumUser = xss(req.body.isPremiumUser);
        let userScore = req.body.userScore;
        let isBanned = xss(req.body.isBanned);
        let organization = xss(req.body.organization);
        let requestPremium = req.body.requestPremium;
        let user = {
          _id: _id,
          firstName: firstName,
          lastName: lastName,
          age: age,
          email: email,
          phoneNumber: phone,
          resume: resume,
          skills: skills,
          linkedin: linkedin,
          twitter: twitter,
          github: github,
          tags: tags,
          yoe: yoe,
          school: school,
          careerRole: careerRole,
          profilePhoto: profilePhoto,
          role: role,
          blogs: blogs,
          articlesRead: articlesRead,
          pastInterviews: pastInterviews,
          upcomingInterviews: upcomingInterviews,
          availableSlots: availableSlots,
          createdAt: createdAt,
          updatedAt: updatedAt,
          isPremiumUser: isPremiumUser,
          userScore: userScore,
          isBanned: isBanned,
          organization: organization,
          requestPremium: requestPremium,
        };
        if (!user || Object.keys(user).length === 0) {
          return res.status(400).json({ error: "There are no updates" });
        }
        try {
          let updatedUser = await users.updateUser(req.params.id, user);
          return res.status(200).json(updatedUser);
        } catch (e) {
          return res.status(400).json(e);
        }
      }
    } catch (e) {
      res.status(400).json(helpers.sendError(e));
    }
  });

export default router;
