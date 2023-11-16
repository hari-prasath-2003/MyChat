import decryptToken from "./decryptToken.js";

import "dotenv/config";
import parseAuthCookie from "./parseAuthCookie.js";

export default function verifyUser(req, res, next) {
  try {
    // return just the token from the string "Authorization=Bearer%20" fom the token
    const token = parseAuthCookie(req.headers.cookie);

    if (!token) {
      return res.status(401).json({ message: "not Authoraised please login" });
    }

    // userId is custom id
    const userId = decryptToken(token);

    req.userId = userId;

    next();
  } catch (error) {
    console.log(error.message);
  }
}
