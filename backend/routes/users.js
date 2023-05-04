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
      res.status(200).json(helpers.sendResponse("ok", allUsers));
    }
  })
  .post(async (req, res) => {
    //todo any one
    let payload = req.body;
    try {
      let validationResult = helpers.validate.register(payload);

      if (!validationResult.validationPassed) {
        res.status(400).json({ data: [], errors: validationResult.errors });
      } else {
        // Check if user with same email exists
        let user = users.getUserByEmail(payload.email.trim().toLowerCase());

        if (user) {
          const { password, ...rest } = await users.createUser(
            validationResult.data
          );
          res
            .status(200)
            .json({ message: "User registered successfully", data: rest });
        } else {
          res
            .status(400)
            .json({ data: [], errors: "User already exists, try signing in." });
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
  .put(async (req, res) => {
    //todo
    //only an user and an admin can change the user details
    req.params.id = helpers.idCheck(req.params.id);
  });

export default router;
