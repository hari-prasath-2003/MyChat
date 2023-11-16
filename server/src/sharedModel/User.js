import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  profile: { type: String, default: "" },
  id: { type: String, default: uuidv4() },
});

userSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 5);
});

const User = mongoose.model("user", userSchema);

export default User;
