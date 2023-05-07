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

    if (payload.role !== "interviewer") {
      let file = req.file;
      let fileLocationDisk = `./uploads/${req.body.tempFilePath}`;
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
          fs.rmSync(fileLocationDisk, { recursive: true, force: true });
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
            console.log({ updateResult });
            if (!updateResult) throw `Internal Server Error`;

            // let allUsers = await users.getAllUsers();
            res.status(200).json(helpers.sendResponse(updateResult));
          } else {
            res
              .status(400)
              .send(helpers.sendError(JSON.stringify(validationResult.errors)));
          }
        } catch (e) {
          console.log(e);
          res.status(400).send(helpers.sendError(JSON.stringify(e)));
        }
      } else if (req.headers["reqtype"] == "premium-request") {
        data.method = "premium-request";

        try {
          req.params.id = helpers.idCheck(req.params.id);
        } catch (e) {
          errors.push(e);
        }
        try {
          data.data = xss(helpers.stringCheck(data.data));
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
      // if (errors.length > 0) throw errors;

      // const updatedUser = await users.patchUser(req.params.id, data);
      // if (updatedUser.error) {
      //   throw updatedUser.data;
      // }
      console.log("waiting here");
      // res.status(200).json(helpers.sendResponse(updatedUser));
    } catch (e) {
      res.status(400).json(helpers.sendError(e));
    }
  });

export default router;
