import { ActionIcon, Avatar, Box, Button, Flex, Text } from "@mantine/core";
import { useEffect, useState } from "react";

import socket from "../../services/socket";

import { LuVideo } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export default function Header({ currentReciverId, name, profile }) {
  const navigate = useNavigate();

  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let typingStopTimer;

    function handleUserTyping({ senderId }) {
      if (senderId !== currentReciverId) return;

      clearTimeout(typingStopTimer);
      setIsTyping(true);

      typingStopTimer = setTimeout(() => {
        setIsTyping(false);
      }, 5000);
    }

    socket.on("user-typing", handleUserTyping);
    return () => socket.off("user-typing", handleUserTyping);
  }, [currentReciverId]);

  async function makeVideoCall() {
    navigate("/video-call", {
      state: { role: "caller", receiverId: currentReciverId },
    });
  }

  return (
    <Flex justify={"space-between"} h={50}>
      <Flex align={"center"} gap={5}>
        <Avatar
          src={import.meta.env.VITE_API_URL + "/assets/profile/" + profile}
        />
        <Flex direction={"column"} justify={"center"}>
          <Text fw={"bold"}>{name}</Text>
          {isTyping ? (
            <Text size={"12px"} c={"green"} fw={"bold"}>
              typing...
            </Text>
          ) : (
            <Text size={"12px"}>online</Text>
          )}
        </Flex>
      </Flex>
      <Flex align={"center"} h={"100%"}>
        <ActionIcon variant="default" h={30} w={50}>
          <LuVideo onClick={makeVideoCall} size={25} />
        </ActionIcon>
      </Flex>
    </Flex>
  );
}
