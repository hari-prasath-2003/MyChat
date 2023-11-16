import Chat from "./model/chat.js";
import Conversation from "./model/conversation.js";

export async function handleSendMsg(io, payload) {
  console.table(payload);
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
}
