import { handleSendMsg, handleUserTyping } from "./chatHandler.js";

export default function registerChatEventHandler(socket, io) {
  socket.on("send-msg", (message) => {
    handleSendMsg(io, message);
  });
  socket.on("typing", (payload) => {
    handleUserTyping(io, payload);
  });

  socket.on("request-call", ({ receiverId, sender }) => {
    console.log("call request");
    io.to(receiverId).emit("incomming-call", sender);
  });

  socket.on("accept-call", ({ senderId, receiverId }) => {
    socket.broadcast.to(senderId).emit("call-requestAborted");
    io.to(receiverId).emit("call-accepted");
  });

  socket.on("reject-call", (receiverId) => {
    io.to(receiverId).emit("call-rejected");
  });

  socket.on("end-call", (receiverId) => {
    io.to(receiverId).emit("end-call");
  });
  socket.on("abort-callRequest", (receiverId) => {
    io.to(receiverId).emit("call-requestAborted");
  });
}
