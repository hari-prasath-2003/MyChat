import Peer from "peerjs";
import socket from "../socket";

export default class CallManager {
  constructor(
    user,
    receiverId,
    userMediaStream,
    remoteUserMediaRef,
    callEndCallback
  ) {
    this.user = user;
    this.receiverId = receiverId;
    this.userMediaStream = userMediaStream;
    this.remoteUserMedia = remoteUserMediaRef;
    this.callEndCallback = callEndCallback;
    this.callRingAudio = new Audio("/audio/callRinging.m4a");
    this.callRingAudio.loop = true;
    this.callRingAudio.preload = true;
    this.callRejectAudio = new Audio("/audio/callDecline.m4a");
    this.callRejectAudio.preload = true;

    socket.on("call-accepted", this.handleCallAccepted.bind(this));
    socket.on("call-rejected", this.handleCallEnd.bind(this));
    socket.on("end-call", this.handleCallEnd.bind(this));
  }

  destroy() {
    socket.off("call-accepted", this.handleCallAccepted.bind(this));
    socket.off("call-rejected", this.handleCallEnd.bind(this));
    socket.on("end-call", this.handleCallEnd.bind(this));
  }

  requestVideoCall() {
    this.callRingAudio.play();
    this.callRingAudio.loop = true;
    socket.emit("request-call", {
      receiverId: this.receiverId,
      senderId: this.user,
    });
  }

  acceptVideoCall() {
    this.peer = new Peer(this.user, { host: "/", port: "3001" });

    this.peer.on("call", (call) => {
      call.answer(this.userMediaStream);
      call.on("stream", (remoteStream) => {
        this.remoteUserMedia.srcObject = remoteStream;
      });
    });

    socket.emit("accept-call", this.receiverId);
  }

  handleCallAccepted() {
    this.callRingAudio.pause();

    this.peer = new Peer(this.user, { host: "/", port: "3001" });
    const call = this.peer.call(this.receiverId, this.userMediaStream);
    call.on("stream", (remoteStream) => {
      this.remoteUserMedia.srcObject = remoteStream;
    });
  }

  handleCallEnd() {
    this.callRingAudio.pause();
    this.callRejectAudio.play();
    this.callEndCallback();
  }

  endCall() {
    socket.emit("endCall");
    this.handleCallEnd();
  }
}
