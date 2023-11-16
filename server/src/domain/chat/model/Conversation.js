import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const conversationSchema = new mongoose.Schema({
  users: { type: [String], ref: "User" },
  conversationId: { type: String, default: uuidv4 },
});

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
