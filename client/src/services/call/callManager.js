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
    this.callAccepted = false;
    this.userMediaStream = userMediaStream;
    this.remoteUserMedia = remoteUserMediaRef;
    this.callEndCallback = callEndCallback;
    this.peer = new Peer(this.user.id, { host: "/", port: "3001" });
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
    socket.off("call-accepted");
    socket.off("call-rejected");
    socket.off("end-call");
    this.peer.disconnect();
    this.peer.destroy();
  }

  requestVideoCall() {
    this.callRingAudio.play();

    socket.emit("request-call", {
      receiverId: this.receiverId,
      sender: this.user,
    });
  }

  acceptVideoCall() {
    this.callAccepted = true;

    this.peer.on("call", (call) => {
      call.answer(this.userMediaStream);
      call.on("stream", (remoteStream) => {
        this.remoteUserMedia.srcObject = remoteStream;
      });
    });

    socket.emit("accept-call", this.receiverId);
  }

  handleCallAccepted() {
    try {
      this.callAccepted = true;

      this.callRingAudio.pause();

      const call = this.peer.call(this.receiverId, this.userMediaStream);

      call.on("stream", (remoteStream) => {
        this.remoteUserMedia.srcObject = remoteStream;
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  handleCallEnd() {
    this.callRingAudio.pause();
    this.callRejectAudio.play();
    this.callEndCallback();
  }

  endCall() {
    if (this.callAccepted) {
      socket.emit("end-call", this.receiverId);
    } else {
      socket.emit("abort-callRequest", this.receiverId);
    }
    this.handleCallEnd();
  }
}
