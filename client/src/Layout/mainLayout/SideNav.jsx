import { Alert, AppShell, Flex, Input, ScrollArea, Tabs } from "@mantine/core";

import UserInfoCard from "../../component/shared/UserInfoCard";
import { useEffect, useRef, useState } from "react";
import { useApiGet } from "../../hooks/useApiGet";
import { useNavigate } from "react-router-dom";
import chatStore from "../../app/chatStore";
import ProfileModal from "../../component/shared/ProfileModal";
import { useDisclosure } from "@mantine/hooks";
import socket from "../../services/socket";

export default function SideNav() {
  const [recomendation, setRecomendation] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState({
    profile: "",
    name: "",
  });

  const [chatFilter, setChatFilter] = useState("");
  const [discoverFilter, setDiscoverFilter] = useState("");
  const [activeTab, setActiveTab] = useState("chat");

  const searchInput = useRef(null);

  const [profileOpened, { openProfile, closeProfile }] = useDisclosure(false);

  const serCurrentReciver = chatStore((state) => state.setCurrentReciver);
  const recentChat = chatStore((state) => state.recentChat);
  const setRecentChat = chatStore((state) => state.setRecentChat);
  const updateRecentChat = chatStore((state) => state.updateRecentChat);

  const navigate = useNavigate();

  const {
    data: recentChatData,
    error: recentChatRequestError,
    loading: recentChatRequestLoading,
  } = useApiGet("/chat/recent");

  const {
    data: recomendedUser,
    error: recomendationError,
    loading: recomendationLoading,
  } = useApiGet("/chat/recomendation?filter=" + discoverFilter);

  const filteredChat =
    recentChatData?.filter(({ name }) =>
      name.toLowerCase().includes(chatFilter.toLowerCase())
    ) || [];

  console.log("rerender");

  // useEffect(() => {
  //   if (!recentChatData) return;

  //   setRecentChat(recentChatData);
  // }, [recentChatData]);

  // useEffect(() => {
  //   if (!recomendedUser) return;

  //   setRecomendation(recomendedUser);
  // }, [recomendedUser]);

  useEffect(() => {
    function handleIncommingMessage(msg) {
      updateRecentChat(msg);
    }

    socket.on("incomming-message", handleIncommingMessage);

    return () => socket.off("incomming-message", handleIncommingMessage);
  }, []);

  function handleSearch(e) {
    setChatFilter(searchInput.current.value);

    setDiscoverFilter(searchInput.current.value);
  }

  function handleUserCardClick(id, name, profile) {
    serCurrentReciver({ id, name, profile });
    navigate("/room");
  }

  function handleProfileClick(profile, name) {
    setSelectedProfile({ profile, name });
    openProfile();
  }

  return (
    <AppShell.Navbar p={"md"}>
      <Flex direction={"column"}>
        <Input
          placeholder="search user"
          ref={searchInput}
          onChange={handleSearch}
        ></Input>
        <Tabs defaultValue={"chat"} onChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value="chat">Chat</Tabs.Tab>
            <Tabs.Tab value="discover">Discover</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="chat">
            <ScrollArea scrollbarSize={0}>
              <Flex gap={20} direction={"column"} justify={"center"}>
                {filteredChat.map(({ name, profile, id, lastMessage }) => (
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
                {filteredChat.length === 0 && (
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
                {recomendation.map(({ name, profile, id }, index) => (
                  <UserInfoCard
                    key={index}
                    name={name}
                    profileImage={profile}
                    handleUserCardClick={() =>
                      handleUserCardClick(id, name, profile)
                    }
                    handleProfileClick={() => handleProfileClick(profile, name)}
                  ></UserInfoCard>
                ))}
              </Flex>
            </ScrollArea>
          </Tabs.Panel>
        </Tabs>
      </Flex>
      <ProfileModal
        user={selectedProfile}
        opened={profileOpened}
        close={closeProfile}
      />
    </AppShell.Navbar>
  );
}
