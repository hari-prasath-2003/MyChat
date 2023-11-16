import { Paper } from "@mantine/core";

import chatStore from "../app/chatStore";

import { useApiGet } from "../hooks/useApiGet.js";

import { useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";

import ChatWindow from "../component/Room/ChatWindow";
import ChatBox from "../component/Room/ChatBox";
import socket from "../services/socket";
import userStore from "../app/userStore";
import Header from "../component/Room/Header.jsx";

const Room = () => {
  const userId = userStore((state) => state.userId);
  const currentReciver = chatStore((state) => state.currentReciver);
  const currentMessage = chatStore((state) => state.currentMessage);
  const setCurrentMessage = chatStore((state) => state.setCurrentMessage);
  const updateCurrentMessage = chatStore((state) => state.updateCurrentMessage);

  const {
    data: previousChatMsg,
    error,
    loading,
  } = useApiGet(
    "http://localhost:3000/chat?user1=" + userId + "&user2=" + currentReciver.id
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!previousChatMsg) return;

    setCurrentMessage(previousChatMsg);
  }, [previousChatMsg]);

  useEffect(() => {
    function handleMsgReceived(msg) {
      const senderId = msg.senderId;
      if (senderId !== currentReciver.id) return;

      const message = msg.message;
      const timeStamp = msg.timeStamp;
      updateCurrentMessage({ senderId, message, timeStamp });
    }

    socket.on("msg-received", handleMsgReceived);
    return () => {
      socket.off("msg-received", handleMsgReceived);
    };
  }, [currentReciver]);

  useEffect(() => {
    if (!currentReciver) navigate("/home");
  }, [currentReciver]);

  function handleSendMsg(msg) {
    const receiverId = currentReciver.id;
    const senderId = userId;
    const message = msg;
    const timeStamp = new Date();
    updateCurrentMessage({ senderId, message, timeStamp });
    socket.emit("send-msg", { senderId, message, receiverId, timeStamp });
  }

  return (
    <Paper h={"calc(100vh - 92px)"} pos={"relative"}>
      <Header
        id={currentReciver.id}
        name={currentReciver.name}
        profile={currentReciver.profile}
      />
      <ChatWindow currentMessage={currentMessage} />
      <ChatBox handleSendMsg={handleSendMsg} />
    </Paper>
  );
};

export default Room;
