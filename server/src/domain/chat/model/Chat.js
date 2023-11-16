import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    senderId: { type: String },
    conversationId: { type: String },
    message: { type: String },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
