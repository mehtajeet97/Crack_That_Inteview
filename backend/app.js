/*
dont use redirect
400 - bad request
404 - data not fount
403 - forbidden 
200 - ok
201 - created session
500 - internal server error

 */
// Main logic

import express from "express";
import router from "./routes/index.js";
import { authenticateRequests } from "./middleware/auth.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// This middleware allows the server to run with JWT Role Authentication.
app.use(authenticateRequests);
app.use((req, res, next) => {
  console.log(
    "[",
    new Date().toUTCString(),
    " ] :",
    req.method,
    req.originalUrl
  );

  next();
});

router(app);

app.listen(process.env.EXPRESS_PORT, () => {
  console.log(`Express server on port ${process.env.EXPRESS_PORT}!`);
  // console.log("The server is online");
});
