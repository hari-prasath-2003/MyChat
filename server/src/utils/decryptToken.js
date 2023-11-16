import jwt from "jsonwebtoken";

export default function decryptToken(token) {
  return jwt.verify(token, process.env.JWT_TOKEN_PRIVACY_KEY);
}
