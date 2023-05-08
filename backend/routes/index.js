import userRoutes from "./users.js";
import users from "../data/users.js";
import interviewRoutes from "./interview.js";
import articleRoutes from "./articles.js";
import trending from "./trending.js";
import examRoutes from "./exam.js";
import auth from "../middleware/auth.js";
import bcrypt from "bcryptjs";
import * as helpers from "../helpers.js";
import { sendEmail } from "../config/mail.js";

const resp = (app) => {
  app.post("/login", async (req, res) => {
    try {
      // Get the email and password from request body.
      let { email, password } = req.body;

      // Validate the credentials
      let validationResult = helpers.validate.login(req.body);

      // Check Validation result
      if (validationResult.validationPassed) {
        // Check if user with provided email exists
        let user = await users.getUserByEmail(email);
        if (!user) throw { error: "Email not found", status: 404 };
        try {
          await bcrypt.compare(password, user.password);
          const accessToken = auth.createAccessToken(user._id, user.role);
          const refreshToken = auth.createRefreshToken(user._id, user.role);
          let {
            firstName,
            lastName,
            age,
            email,
            role,
            isBanned,
            isPremiumUser,
            userScore,
            _id,
            requestPremium,
            skills,
          } = user;
          await sendEmail(user, "login");

          res.status(200).json({
            accessToken,
            refreshToken,
            userDetails: {
              firstName,
              lastName,
              age,
              email,
              role,
              isBanned,
              isPremiumUser,
              userScore,
              _id,
              requestPremium,
              skills,
            },
          });
        } catch (e) {
          console.log(e);
          res
            .status(400)
            .json({ data: [], errors: "Invalid email or password" });
        }
      } else {
        res.status(400).json({ data: [], errors: validationResult.errors });
      }
    } catch (e) {
      if (e.status === 404) {
        res.status(400).json({ errors: "Email not found" });
      } else {
        res.status(500).json(helpers.sendError(e));
      }
    }
  });
  app.use("/users", userRoutes);
  app.use("/interviews", interviewRoutes);
  app.use("/articles", articleRoutes);
  app.use("/trending", trending);
  app.use("/exams", examRoutes);
  app.get("/logout", (req, res) => {
    res.status(200).json(helpers.sendResponse("user successfully logged out"));
  });
  app.use("*", (req, res) => {
    res.status(404).json(helpers.sendError("Not found"));
  });
};

export default resp;
