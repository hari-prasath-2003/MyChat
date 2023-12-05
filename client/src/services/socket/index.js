import io from "socket.io-client";

function getAuthCookie() {
  const cookie = document.cookie;
  console.log("fate", document.cookie);
  return cookie;
}

const socket = io("http://localhost:3000", {
  extraHeaders: {},
  autoConnect: false,
});

export default socket;
