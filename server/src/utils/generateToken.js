import jwt from "jsonwebtoken";

import "dotenv/config";

export default function generateToken(id) {
  const token = jwt.sign(id, process.env.JWT_TOKEN_PRIVACY_KEY);

  return token;
}
