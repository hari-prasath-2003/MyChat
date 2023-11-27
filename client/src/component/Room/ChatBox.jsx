import { Group, Input, Menu, ActionIcon } from "@mantine/core";
import { BsSendFill } from "react-icons/bs";

import { useEffect, useState } from "react";
import socket from "../../services/socket";

import { FaPaperclip } from "react-icons/fa6";
import { CiVideoOn, CiImageOn, CiPaperplane } from "react-icons/ci";
import MediaMenu from "./MediaMenu";

export default function ChatBox({ handleSendMsg, receiverId, userId }) {
  const [msg, setMsg] = useState("");

  function handleInputOnEnter(e) {
    if (e.code === "Enter") {
      msgSendHandler();
    }
  }

  function msgSendHandler() {
    handleSendMsg(msg);
    setMsg("");
  }

  function notifyTyping() {
    socket.emit("typing", { senderId: userId, receiverId });
  }

  return (
    <Group pos={"absolute"} bottom={0} w={"100%"} h={50} gap={"sm"}>
      <MediaMenu />
      <Input
        style={{ flex: 1 }}
        placeholder="Type a message ...."
        value={msg}
        onChange={(e) => {
          setMsg(e.target.value);
          notifyTyping();
        }}
        onKeyDown={handleInputOnEnter}
      ></Input>
      <CiPaperplane onClick={msgSendHandler} size={25} />
    </Group>
  );
}
