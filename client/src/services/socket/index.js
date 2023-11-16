import io from "socket.io-client";

const socket = io("http://localhost:3000", {
  extraHeaders: {
    Authorization: document.cookie,
  },
});

export default socket;
