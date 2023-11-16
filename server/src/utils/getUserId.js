import User from "../sharedModel/User.js";
import decryptToken from "./decryptToken.js";
import parseAuthCookie from "./parseAuthCookie.js";

export default async function getUserId(authCookie) {
  const token = parseAuthCookie(authCookie);

  const userId = decryptToken(token);

  return userId;
}
