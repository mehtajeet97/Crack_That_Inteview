import Router from "express";
import userRoutes from "./users.js";
import interviewRoutes from "./interview.js";
import articleRoutes from "./articles.js";
// import examRoutes from "./exam.js"
// import {router as trending} from "./trending.js"
// import {router as interview} from "./interview.js"
const router = Router();

const resp = (app) => {
  app.use("/users", userRoutes);
  app.use("/interviews", interviewRoutes);
  app.use("/articles", articleRoutes);
  // app.use("/exams",examRoutes)
  // app.use("/trending",trending)
  app.use("*", (req, res) => {
    res.send("hello world");
  });
};

export default resp;
