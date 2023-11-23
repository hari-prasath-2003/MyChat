import Peer from "peerjs";
import socket from "../socket";

export default class VideoCallHandler {
  constructor(
    userId,
    receiverId,
    userCameraStream,
    userCameraRef,
    remoteUserCameraRef
  ) {
    this.userId = userId;
    this.receiverId = receiverId;
    this.userCameraStream = userCameraStream;
    this.userCamera = userCameraRef;
    this.remoteUserCamera = remoteUserCameraRef;
  }
  handleCallAccepted() {
    const peer = new Peer(this.userId, { host: "/", port: "3001" });
    const call = peer.call(this.receiverId, this.userCameraStream);

    call.on("stream", (remoteStream) => {
      this.remoteUserCamera.srcObject = remoteStream;
    });
  }

  requestVideoCall() {
    socket.emit("request-videocall", {
      receiverId: this.receiverId,
      senderId: this.userId,
    });
  }

  acceptVideoCall() {
    const peer = new Peer(this.userId, { host: "/", port: "3001" });

    peer.on("call", (call) => {
      call.answer(this.userCameraStream);
      call.on("stream", (remoteStream) => {
        this.remoteUserCamera.srcObject = remoteStream;
      });
    });

    socket.emit("accept-videocall", this.receiverId);
  }
}
