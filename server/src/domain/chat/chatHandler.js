import getUserInfo from "../../utils/getUserInfo.js";
import Chat from "./model/chat.js";
import Conversation from "./model/conversation.js";

export async function handleSendMsg(io, payload) {
  const senderId = payload.senderId;
  const receiverId = payload.receiverId;
  const message = payload.message;

  let conversation = await Conversation.findOne({
    users: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = new Conversation({ users: [senderId, receiverId] });
    await conversation.save();
  }

  const conversationId = conversation.conversationId;

  const newChat = new Chat({ senderId, conversationId, message });

  await newChat.save();

  io.to(receiverId).emit("msg-received", { senderId, message });
  const senderInfo = await getUserInfo(senderId);
  io.to(receiverId).emit("incomming-message", { sender: senderInfo, message });
}

export function handleUserTyping(io, payload) {
  io.to(payload.receiverId).emit("user-typing", { senderId: payload.senderId });
}
