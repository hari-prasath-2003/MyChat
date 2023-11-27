import { Button, Divider, Paper } from "@mantine/core";

import chatStore from "../app/chatStore";

import { useApiGet } from "../hooks/useApiGet.js";

import { useEffect, useRef } from "react";

import { Navigate, useNavigate } from "react-router-dom";

import ChatWindow from "../component/Room/ChatWindow";
import ChatBox from "../component/Room/ChatBox";
import socket from "../services/socket";
import userStore from "../app/userStore";
import Header from "../component/Room/Header.jsx";
import Chat from "../services/chat/index.js";

const Room = () => {
  const userId = userStore((state) => state.userId);
  const currentReciver = chatStore((state) => state.currentReciver);
  const currentMessage = chatStore((state) => state.currentMessage);
  const setCurrentMessage = chatStore((state) => state.setCurrentMessage);
  const updateCurrentMessage = chatStore((state) => state.updateCurrentMessage);

  const chat = useRef(null);

  const navigate = useNavigate();

  const {
    data: previousChatMsg,
    error,
    loading,
  } = useApiGet(
    "http://localhost:3000/chat?user1=" + userId + "&user2=" + currentReciver.id
  );

  useEffect(() => {
    chat.current = new Chat(userId, currentReciver.id);
    chat.current.onMsg(updateCurrentMessage);

    return () => chat.current.destroy();
  }, [userId, currentReciver]);

  useEffect(() => {
    if (!previousChatMsg) return;

    setCurrentMessage(previousChatMsg);
  }, [previousChatMsg]);

  useEffect(() => {
    if (!currentReciver) navigate("/home");
  }, [currentReciver]);

  function handleSendMsg(msg) {
    chat.current.sendMsg(msg);
    updateCurrentMessage({ senderId: userId, message: msg });
  }

  return (
    <Paper h={"calc(100vh - 92px)"} pos={"relative"}>
      <Header
        currentReciverId={currentReciver.id}
        name={currentReciver.name}
        profile={currentReciver.profile}
      />
      <Divider />
      <ChatWindow currentMessage={currentMessage} />
      <Divider />
      <ChatBox
        handleSendMsg={handleSendMsg}
        receiverId={currentReciver.id}
        userId={userId}
      />
    </Paper>
  );
};

export default Room;
