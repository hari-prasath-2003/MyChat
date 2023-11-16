import { Server } from "socket.io";
import registerChatEventHandler from "./domain/chat/chatEvent.js";
import getUserId from "./utils/getUserId.js";

function configureSocketIo(serverInstance) {
  return new Server(serverInstance, { cors: { origin: "*" } });
}

async function joinUserToRoom(socket) {
  try {
    const authCookie = socket.handshake.headers.authorization;
    const userId = await getUserId(authCookie);
    socket.join(userId);
    console.log("user joined with id : " + userId);
  } catch (error) {
    console.log("socket error : ", error.message);
  }
}

function handleSocketConnection(socket) {
  const io = this;
  joinUserToRoom(socket);
  registerChatEventHandler(socket, io);
}

export default function createSocketServer(serverInstance) {
  const io = configureSocketIo(serverInstance);
  io.on("connection", handleSocketConnection);
}
