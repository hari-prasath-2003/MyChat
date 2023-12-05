import { handleSendMsg, handleUserTyping } from "./chatHandler.js";

export default function registerChatEventHandler(socket, io) {
  socket.on("send-msg", (message) => {
    handleSendMsg(io, message);
  });
  socket.on("typing", (payload) => {
    handleUserTyping(io, payload);
  });

  socket.on("request-call", ({ receiverId, senderId }) => {
    io.to(receiverId).emit("incomming-call", senderId);
  });

  socket.on("accept-call", (receiverId) => {
    io.to(receiverId).emit("call-accepted");
  });

  socket.on("reject-call", (receiverId) => {
    io.to(receiverId).emit("call-rejected");
  });
}
