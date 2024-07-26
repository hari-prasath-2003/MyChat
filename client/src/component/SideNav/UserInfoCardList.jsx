import { Alert, Flex, ScrollArea } from "@mantine/core";
import React from "react";
import UserInfoCard from "./UserInfoCard";
import { useNavigate } from "react-router-dom";
import chatStore from "../../app/chatStore";

function UserInfoCardList({
  recentChatUsers,
  emptyListMsg,
  handleProfileClick,
}) {
  const serCurrentReciver = chatStore((state) => state.setCurrentReciver);

  const navigate = useNavigate();

  function handleUserCardClick(id, name, profile) {
    serCurrentReciver({ id, name, profile });
    navigate("/room");
  }

  if (recentChatUsers.length === 0) {
    return (
      <Alert title="No user with that name" color="yellow">
        {emptyListMsg}
      </Alert>
    );
  }
  return (
    <ScrollArea scrollbarSize={0}>
      <Flex gap={20} direction={"column"} justify={"center"}>
        {recentChatUsers.map(({ name, profile, id, lastMessage, typing }) => (
          <UserInfoCard
            key={id}
            lastMessage={lastMessage}
            name={name}
            profileImage={profile}
            typing={typing}
            handleUserCardClick={() => handleUserCardClick(id, name, profile)}
            handleProfileClick={() => handleProfileClick(profile, name)}
          ></UserInfoCard>
        ))}
      </Flex>
    </ScrollArea>
  );
}

export default UserInfoCardList;
