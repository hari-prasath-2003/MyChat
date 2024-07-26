import socket from "../socket";

export default class CallListner {
  constructor(onCallCallback, onCallAbortCallback) {
    this.onCallCallback = onCallCallback;
    this.onCallAbortCallback = onCallAbortCallback;
    this.callRingTone = new Audio("/audio/incomingCall.wav");
    this.callRingTone.loop = true;
    this.callRingTone.preload = true;

    socket.on("incomming-call", this.handleIncomingCall.bind(this));
    socket.on("call-requestAborted", this.handelCallAbort.bind(this));
  }
  destroy() {
    socket.off("incomming-call");
    socket.off("call-requestAborted");
  }
  handleIncomingCall(caller) {
    this.callRingTone.play();
    this.onCallCallback(caller);
  }

  acceptCall() {
    this.callRingTone.pause();
    console.log(this.callRingTone.paused);
  }

  rejectCall(receiverId) {
    socket.emit("reject-call", receiverId);
    this.callRingTone.pause();
  }

  handelCallAbort() {
    this.callRingTone.pause();
    this.onCallAbortCallback();
  }
}
