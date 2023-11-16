import { Button, Group, Input } from "@mantine/core";
import { BsSendFill } from "react-icons/bs";

import { useState } from "react";

export default function ChatBox({ handleSendMsg }) {
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

  return (
    <Group pos={"absolute"} bottom={0} w={"100%"} h={70} align="center">
      <Input
        style={{ flex: 1 }}
        placeholder="Type a message ...."
        value={msg}
        onChange={(e) => {
          setMsg(e.target.value);
        }}
        onKeyDown={handleInputOnEnter}
      ></Input>
      <Button leftSection={<BsSendFill />} onClick={msgSendHandler}>
        Send
      </Button>
    </Group>
  );
}
