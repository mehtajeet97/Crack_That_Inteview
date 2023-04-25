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
import resp from "./routes/index.js";
import cookieParser from "cookie-parser";
import auth from "./authFile.js";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  let method = req.method;
  let path = req.originalUrl;
  let skipPath = ["/login", "/users"];
  if (!skipPath.includes(path)) {
    let token = req.header("Authorization");
    if (token) {
      console.log("in token");
      if (auth.authChecker(token)) {
        console.log("in auth checker");
        next();
      } else {
        res.status(401).json({ message: "missing authorization token" });
      }
    } else {
      res.status(401).json({ message: "missing authorization token" });
    }
  } else if (path === "/users" && method == "POST") {
    next();
  } else {
    next();
  }
});

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

resp(app);

app.listen(3000, () => {
  console.log("The server is online");
});
