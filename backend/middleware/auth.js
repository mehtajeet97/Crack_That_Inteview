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

const createAccessToken = (id, role, expiresIn = expirationTime.week) => {
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

export const authenticateRequests = async (req, res, next) => {
  let path = req.originalUrl;
  let method = req.method;
  let forUserCreate = path === "/users" && method === "POST";
  let staticAssetsRoute = path.includes("/static");

  if (path === "/login" || forUserCreate || staticAssetsRoute) {
    next();
  } else {
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
          }
        }
      );
    } else {
      res.status(401).json({ error: "Missing Authorization Token" });
    }
  }
};

export default { createAccessToken, createRefreshToken };
