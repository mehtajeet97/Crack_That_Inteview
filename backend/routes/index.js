import userRoutes from "./users.js";
import users from "../data/users.js";
import interviewRoutes from "./interview.js";
import articleRoutes from "./articles.js";
import auth from "../authFile.js";
import bcrypt from "bcryptjs";
import * as helpers from "../helpers.js";

const resp = (app) => {
  app.post("/login", async (req, res) => {
    try {
      let email = helpers.emailCheck(req.body.email);
      let password = req.body.password;
      let user = await users.getUserByEmail(email);
      if (!(await bcrypt.compare(password, user.password)))
        throw "problem with email or password";
      const accessToken = auth.createToken(user._id, user.role);
      const refreshToken = auth.createRefreshToken(user._id, user.role);
      res.json({ id: user._id, accessToken, refreshToken });
    } catch (e) {
      res.status(400).json(helpers.sendError(e));
    }
  });
  app.use("/users", userRoutes);
  app.use("/interviews", interviewRoutes);
  app.use("/articles", articleRoutes);
  // app.use("/exams",examRoutes)
  // app.use("/trending",trending)
  app.get("/logout", (req, res) => {
    res.status(200).json(helpers.sendResponse("user successfully logged out"));
  });
  app.use("*", (req, res) => {
    res.status(404).json(helpers.sendError("page not found"));
  });
};

export default resp;
