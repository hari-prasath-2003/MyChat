import socket from "../socket";

export default class CallListner {
  constructor(onCallCallback) {
    this.onCallCallback = onCallCallback;
    this.callRingTone = new Audio("/audio/incomingCall.wav");
    this.callRingTone.loop = true;
    this.callRingTone.preload = true;

    socket.on("incomming-call", this.handleIncomingCall.bind(this));
  }
  destroy() {
    socket.off("incomming-call", this.handleIncomingCall.bind(this));
  }
  handleIncomingCall(caller) {
    this.callRingTone.play();
    this.caller = caller;
    this.onCallCallback(caller);
  }

  acceptCall(callback) {
    callback();
  }

  rejectCall() {
    socket.emit("reject-call", this.caller.id);
    this.callRingTone.pause();
  }
}
