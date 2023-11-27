import socket from "../socket";

export default class Chat {
  constructor(userId, receiverId) {
    this.userId = userId;
    this.receiverId = receiverId;
    socket.on("msg-received", this.receiveMsg.bind(this));
  }
  destroy() {
    socket.off("msg-received", this.receiveMsg);
  }

  sendMsg(msg) {
    const receiverId = this.receiverId;
    const senderId = this.userId;
    const message = msg;
    socket.emit("send-msg", { senderId, message, receiverId });
  }

  receiveMsg(msg) {
    console.log("msg-recv", msg);
    const senderId = msg.senderId;
    console.log(senderId, this.receiverId);

    if (senderId !== this.receiverId) return;

    const message = msg.message;
    this.msgListnerCallback({ senderId, message });
  }

  onMsg(msgListnerCallback) {
    this.msgListnerCallback = msgListnerCallback;
  }
}
