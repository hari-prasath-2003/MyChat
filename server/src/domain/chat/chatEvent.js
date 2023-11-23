import { handleSendMsg, handleUserTyping } from "./chatHandler.js";

export default function registerChatEventHandler(socket, io) {
  socket.on("send-msg", (message) => {
    handleSendMsg(io, message);
  });
  socket.on("typing", (payload) => {
    handleUserTyping(io, payload);
  });

  socket.on("request-videocall", ({ receiverId, senderId }) => {
    io.to(receiverId).emit("incomming-call", senderId);
  });

  socket.on("accept-videocall", (receiverId) => {
    console.log("call accepted to ", receiverId);
    io.to(receiverId).emit("videocall-accepted");
  });
}
