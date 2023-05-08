import Router from "express";
import users from "../data/users.js";
import * as helpers from "../helpers.js";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

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
      res.status(200).json(helpers.sendResponse("ok", allUsers));
    }
  })
  .post(upload.single("resume"), async (req, res) => {
    let file = req.file;
    let payload = req.body;
    let fileLocationDisk = `./uploads/${req.body.tempFilePath}`;
    let fileLocationDB = `static/${req.body.tempFilePath}/${file.originalname}`;
    payload.resume = fileLocationDB;

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
            res
              .status(400)
              .json({
                data: [],
                errors: "User already exists, try signing in.",
              });
          }
        }
      }
    } catch (e) {
      console.log(`POST /users: ${e}`);
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
      res.json(user);
    } catch (e) {
      console.log(e);
      res.status(400).json(helpers.sendError(e));
    }
  })
  .delete(async (req, res) => {
    //todo  only an admin can delete the user
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
  })
  .patch(async (req, res) => {
    let userInfo = req.body;
    console.log(userInfo);
    if (!userInfo || Object.keys(userInfo).length === 0) {
      return res.status(400).json({ error: "There are no updates" });
    }
    try {
      let updatedUser = await users.updateUser(req.params.id, userInfo);
      return res.status(200).json(updatedUser);
    } catch (e) {
      return res.status(400).json(e);
    }
  });

export default router;
