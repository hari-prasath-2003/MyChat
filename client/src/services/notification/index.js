import socket from "../socket";

export default class Notification {
  constructor(event, onEventCallBack) {
    this.onEventCallBack = onEventCallBack;
    this.event = event;
    socket.on(this.event, this.onEventCallBack);
  }

  destroy() {
    socket.off(this.event, this.onEventCallBack);
  }
}
