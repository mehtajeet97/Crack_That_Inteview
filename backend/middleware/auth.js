import jwt from "jsonwebtoken";

// An hour expiration time
const expirationTime = {
  fiveSeconds: 5,
  minute: 60,
  twoMinutes: 60 * 2,
  fiveMinutes: 60 * 5,
  hour: 60 * 60,
  week: 60 * 60 * 24 * 7,
};
const tokenMaxAge = expirationTime.fiveSeconds;
// A week expiration time
const refreshTokenMaxAge = expirationTime.minute;

// export const assignToken = (id, role, expr);

const createAccessToken = (id, role, expiresIn = expirationTime.hour) => {
  return jwt.sign(
    { id, role, type: "accessToken" },
    "let's crack that interview",
    {
      expiresIn,
    }
  );
};

const createRefreshToken = (id, role, expiresIn = expirationTime.week) => {
  return jwt.sign(
    { id, role, type: "refreshToken" },
    "refresh token let's crack that interview",
    {
      expiresIn,
    }
  );
};
// const authChecker = (token) => {
//   return jwt.verify(token, "let's crack that interview", (error, password) => {
//     console.log({ error, password });
//     // if (error) {
//     //   console.log({ error });
//     //   return false;
//     // } else {
//     //   console.log({ password });
//     //   return { password };
//     // }
//   });
// };
export const authenticateRequests = async (req, res, next) => {
  let skipAuthAt = ["/login"];
  let path = req.originalUrl;
  let method = req.method;
  console.log("in middleware", { path, method });
  if (!skipAuthAt.includes(path) && path !== "/users" && method !== "POST") {
    let accessToken = req.headers.authorization;
    let refreshToken = req.headers.refreshtoken;
    if (accessToken) {
      jwt.verify(
        accessToken,
        "let's crack that interview",
        (err, decodedToken) => {
          if (err) {
            res.status(401).json({ error: "Access Token expired" });
          } else {
            next();
          }
        }
      );
    } else if (refreshToken) {
      jwt.verify(
        refreshToken,
        "refresh token let's crack that interview",
        (err, decodedToken) => {
          if (err) {
            res.status(401).json({ error: "Refresh Token expired" });
          } else {
            next();
            // console.log(decodedToken, "decoded token from refresh cookie");
            // const newToken = createToken(decodedToken.id, decodedToken.role);

            // const newRefreshtoken = createRefreshToken(
            //   decodedToken.id,
            //   decodedToken.role
            // );
            // res.cookie("refresh", newRefreshtoken, {
            //   httpOnly: true,
            //   maxAge: refreshTokenMaxAge * 1000,
            // });
            // res.cookie("auth", newRefreshtoken, {
            //   httpOnly: true,
            //   maxAge: refreshTokenMaxAge * 1000,
            // });
            // next();
          }
        }
      );
    } else {
      res.status(401).json({ error: "Missing Authorization Token" });
    }
  } else {
    next();
  }
};

export default { createAccessToken, createRefreshToken };
