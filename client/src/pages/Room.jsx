import { Button, Divider, Paper } from "@mantine/core";

import chatStore from "../app/chatStore";

import { useApiGet } from "../hooks/useApiGet.js";

import { useEffect, useRef } from "react";

import { Navigate, useNavigate } from "react-router-dom";

import ChatWindow from "../component/Room/ChatWindow";
import ChatBox from "../component/Room/ChatBox";
import userStore from "../app/userStore";
import Header from "../component/Room/Header.jsx";
import useChat from "../hooks/useChat.js";

const Room = () => {
  const userId = userStore((state) => state.userId);
  const currentReciver = chatStore((state) => state.currentReciver);
  const currentMessage = chatStore((state) => state.currentMessage);

  const { sendMsg } = useChat({ userId, receiverId: currentReciver.id });

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentReciver) navigate("/home");
  }, [currentReciver]);

  return (
    <Paper h={"100%"}>
      <Header
        currentReciverId={currentReciver.id}
        name={currentReciver.name}
        profile={currentReciver.profile}
      />
      <Divider />
      <ChatWindow currentMessage={currentMessage} />
      <Divider />
      <ChatBox
        handleSendMsg={sendMsg}
        receiverId={currentReciver.id}
        userId={userId}
      />
    </Paper>
  );
};

export default Room;
