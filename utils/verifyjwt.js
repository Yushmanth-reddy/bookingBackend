import cookieParser from "cookie-parser";
import { createError } from "./error.js";
import jwt from "jsonwebtoken";

// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token;
//   if (!token) return next(createError(401, "Token not found"));

//   jwt.verify(token, process.env.JWT, (err, data) => {
//     if (err) return next(createError(401, "Token not valid"));
//     res.user = data;
//     next();
//   });
// };

// export const verifyUser = (req, res, next) => {
//   verifyToken(req, res, next, () => {
//     if (req.user.id === req.params.id || req.user.isAdmin) {
//       console.log(req.user.isAdmin);
//       // next();
//     } else {
//       if (err) return next(createError(401, "User not athenticated"));
//     }
//   });
// };

// export const verifyAdmin = (req, res, next) => {
//   verifyToken(req, res, next, () => {
//     if (req.user.isAdmin) {
//       next();
//     } else {
//       if (err) return next(createError(401, "User not athenticated"));
//     }
//   });
// };

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      console.log(req.user.id);
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    console.log(req.user);
    if (req.user.isAdmin) {
      console.log(req.user.isAdmin);
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
