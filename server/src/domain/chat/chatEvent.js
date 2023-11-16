import { handleSendMsg } from "./chatHandler.js";

export default function registerChatEventHandler(socket, io) {
  socket.on("send-msg", (message) => {
    handleSendMsg(io, message);
  });
}
