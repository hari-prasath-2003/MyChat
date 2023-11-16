import { Alert, AppShell, Flex, Input, ScrollArea, Tabs } from "@mantine/core";

import UserInfoCard from "../../UserInfoCard";
import { useEffect, useState } from "react";
import { useApiGet } from "../../hooks/useApiGet";
import { useNavigate } from "react-router-dom";
import chatStore from "../../app/chatStore";
import ProfileModal from "../../component/shared/ProfileModal";
import { useDisclosure } from "@mantine/hooks";

export default function SideNav() {
  const [recomendation, setRecomendation] = useState([]);
  const [recent, setRecent] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState({
    profile: "",
    name: "",
  });

  const [opened, { open, close }] = useDisclosure(false);

  const serCurrentReciver = chatStore((state) => state.setCurrentReciver);
  const setConversationId = chatStore((state) => state.setConversationId);

  const navigate = useNavigate();

  const {
    data: recomendedUser,
    error: recomendationError,
    loading: recomendationLoading,
  } = useApiGet("http://localhost:3000/chat/recomendation");

  const {
    data: recentChat,
    error: recentChatRequestError,
    loading: recentChatRequestLoading,
  } = useApiGet("http://localhost:3000/chat/recent");

  useEffect(() => {
    if (!recomendedUser) return;

    setRecomendation(recomendedUser);
  }, [recomendedUser]);

  useEffect(() => {
    if (!recentChat) return;

    setRecent(recentChat);
  }, [recentChat]);

  function handleUserCardClick(id, name, profile) {
    const selectedReciver = { id: id, name: name, profile: profile };
    serCurrentReciver(selectedReciver);
    navigate("/room");
  }

  function handleProfileClick(profile, name) {
    setSelectedProfile({ profile, name });
    open();
  }

  return (
    <AppShell.Navbar p={"md"}>
      <Flex direction={"column"}>
        <Input placeholder="search user"></Input>
        <Tabs defaultValue={"chat"}>
          <Tabs.List>
            <Tabs.Tab value="chat">Chat</Tabs.Tab>
            <Tabs.Tab value="discover">Discover</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="chat">
            <ScrollArea scrollbarSize={0}>
              <Flex gap={20} direction={"column"} justify={"center"}>
                {recent.map(({ name, profile, id, lastMessage }) => (
                  <UserInfoCard
                    key={id}
                    lastMessage={lastMessage}
                    name={name}
                    profileImage={profile}
                    handleUserCardClick={() =>
                      handleUserCardClick(id, name, profile)
                    }
                    handleProfileClick={() => handleProfileClick(profile, name)}
                  ></UserInfoCard>
                ))}
                {recent.length === 0 && (
                  <Alert title="No chat history" color="yellow">
                    {"you don't have chat history find user in discover"}
                  </Alert>
                )}
              </Flex>
            </ScrollArea>
          </Tabs.Panel>
          <Tabs.Panel value="discover">
            <ScrollArea scrollbarSize={0}>
              <Flex gap={20} direction={"column"}>
                {recomendation.map(
                  ({ name, profile, id, lastMessage }, index) => (
                    <UserInfoCard
                      key={index}
                      name={name}
                      profileImage={profile}
                      handleUserCardClick={() =>
                        handleUserCardClick(id, name, profile)
                      }
                      handleProfileClick={() =>
                        handleProfileClick(profile, name)
                      }
                    ></UserInfoCard>
                  )
                )}
              </Flex>
            </ScrollArea>
          </Tabs.Panel>
        </Tabs>
      </Flex>
      <ProfileModal user={selectedProfile} opened={opened} close={close} />
    </AppShell.Navbar>
  );
}
