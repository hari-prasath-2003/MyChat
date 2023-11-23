import { Group, Input, Menu, ActionIcon } from "@mantine/core";
import { BsSendFill } from "react-icons/bs";

import { useEffect, useState } from "react";
import socket from "../../services/socket";

import { FaPaperclip } from "react-icons/fa6";
import { CiVideoOn, CiImageOn, CiPaperplane } from "react-icons/ci";

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
    <Group pos={"absolute"} bottom={0} w={"100%"} h={50}>
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

      <Menu>
        <Menu.Target>
          <ActionIcon variant="default" h={36}>
            <FaPaperclip />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Media share</Menu.Label>
          <Menu.Item leftSection={<CiVideoOn />}>Video</Menu.Item>
          <Menu.Item leftSection={<CiImageOn />}>Image</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
