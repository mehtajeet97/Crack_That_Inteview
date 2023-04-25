import jwt from "jsonwebtoken";

const tokenMaxAge = 60 * 60;
const refreshTokenMaxAge = 7 * 24 * 60 * 60;
const createToken = (id, role = "user") => {
  return jwt.sign(
    { id, role, type: "authToken" },
    "let's crack that interview",
    {
      expiresIn: tokenMaxAge,
    }
  );
};
const createRefreshToken = (id, role = "user") => {
  return jwt.sign(
    { id, role, type: "refreshToken" },
    "refresh token let's crack that interview",
    {
      expiresIn: refreshTokenMaxAge,
    }
  );
};
const authChecker = (token) => {
  const tok = token.split(" ")[1];
  const result = jwt.verify(
    tok,
    "let's crack that interview",
    (err, decodedToken) => {
      if (err) {
        return false;
      } else {
        console.log(decodedToken);
        return true;
      }
    }
  );
  console.log(result);
  return result;
};
// const authChecker = async (req, res, next) => {
//   let token = req.cookies.auth;
//   let refreshToken = req.cookies.refresh;
//   if (token) {
//     jwt.verify(token, "let's crack that interview", (err, decodedToken) => {
//       if (err) {
//         res.redirect("/login");
//       } else {
//         console.log(decodedToken);
//         return decodedToken;
//       }
//     });
//   } else if (refreshToken) {
//     jwt.verify(
//       refreshToken,
//       "refresh token let's crack that interview",
//       (err, decodedToken) => {
//         if (err) {
//           console.log(err, "error in refresh token check and provider");
//           res.redirect("/login");
//         } else {
//           console.log(decodedToken, "decoded token from refresh cookie");
//           const newToken = createToken(decodedToken.id, decodedToken.role);

//           const newRefreshtoken = createRefreshToken(
//             decodedToken.id,
//             decodedToken.role
//           );
//           res.cookie("refresh", newRefreshtoken, {
//             httpOnly: true,
//             maxAge: refreshTokenMaxAge * 1000,
//           });
//           res.cookie("auth", newRefreshtoken, {
//             httpOnly: true,
//             maxAge: refreshTokenMaxAge * 1000,
//           });
//           next();
//         }
//       }
//     );
//   } else {
//     res.redirect("/login");
//   }
// };

export default { createToken, createRefreshToken, authChecker };
