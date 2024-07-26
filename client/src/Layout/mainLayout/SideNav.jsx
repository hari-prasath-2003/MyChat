import { Alert, AppShell, Flex, Input, ScrollArea, Tabs } from "@mantine/core";

import UserInfoCard from "../../component/SideNav/UserInfoCard";
import { useEffect, useRef, useState } from "react";
import { useApiGet } from "../../hooks/useApiGet";
import { useNavigate } from "react-router-dom";
import chatStore from "../../app/chatStore";
import ProfileModal from "../../component/SideNav/ProfileModal";
import { useDisclosure } from "@mantine/hooks";

import useNotification from "../../hooks/useNotification";
import UserInfoCardList from "../../component/SideNav/UserInfoCardList";

export default function SideNav() {
  const [recomendation, setRecomendation] = useState([]);
  const [recentChat, setRecentChat] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState({
    profile: "",
    name: "",
  });
  const [searchFilter, setSearchFilter] = useState("");

  const { notification: newMessage } = useNotification("incomming-message");
  const { notification: userTyping } = useNotification("user-typing");

  const searchInput = useRef(null);

  const [profileOpened, { open: openProfile, close: closeProfile }] =
    useDisclosure(false);

  const {
    data: recentChatData,
    error: recentChatRequestError,
    loading: recentChatRequestLoading,
  } = useApiGet("/chat/recent");

  const {
    data: recomendedUser,
    error: recomendationError,
    loading: recomendationLoading,
  } = useApiGet("/chat/recomendation?filter=" + searchFilter);

  useEffect(() => {
    if (!recentChatData) return;

    setRecentChat(recentChatData);
  }, [recentChatData]);

  useEffect(() => {
    if (!recomendedUser) return;

    setRecomendation(recomendedUser);
  }, [recomendedUser]);

  useEffect(() => {
    if (!newMessage) return;

    setRecentChat((recentChat) => {
      const senderId = newMessage.sender.id;
      const lastMessage = newMessage.message;

      const newMsgUserInfo = { ...newMessage.sender, lastMessage: lastMessage };

      const filteredUserInfo = recentChat.filter(
        (user) => user.id !== senderId
      );

      return [newMsgUserInfo, ...filteredUserInfo];
    });
  }, [newMessage]);

  useEffect(() => {
    if (!userTyping) return;

    function createStopUserTypingTimer(typingUser) {
      return setTimeout(() => {
        setRecentChat((recentChat) => {
          const removedUserTypingChat = recentChat.map((chat) =>
            chat.id === typingUser.id ? { ...chat, typing: undefined } : chat
          );
          return removedUserTypingChat;
        });
      }, 3000); // this will remove the user typing after 3 sec
    }

    setRecentChat((recentChat) => {
      const typingUser = recentChat.find((chat) => chat.id === userTyping.id);

      // if the user is not in our recentchat (can be new user typing in our account) means do nothing
      if (!typingUser) return recentChat;

      //it will clear existing
      // stoptimer so if user
      //continuously type it will
      //clear existing time and new timer will be created bellow

      clearTimeout(typingUser.typingTimer);

      //it will always set when user typing but create new timer everytime

      const updatedChatWithTypingUser = recentChat.map((chat) =>
        chat.id === typingUser.id
          ? {
              ...chat,
              typing: true,
              typingTimer: createStopUserTypingTimer(typingUser),
            }
          : chat
      );
      return updatedChatWithTypingUser;
    });
  }, [userTyping]);

  function handleSearch() {
    setSearchFilter(searchInput.current.value);
  }

  function handleProfileClick(profile, name) {
    setSelectedProfile({ profile, name });
    openProfile();
  }

  const filteredChat =
    recentChat.filter(({ name }) =>
      name.toLowerCase().includes(searchFilter.toLowerCase())
    ) || [];

  return (
    <AppShell.Navbar p={"md"}>
      <Flex direction={"column"}>
        <Input
          placeholder="search user"
          ref={searchInput}
          onChange={handleSearch}
        ></Input>
        <Tabs defaultValue={"chat"}>
          <Tabs.List>
            <Tabs.Tab value="chat">Chat</Tabs.Tab>
            <Tabs.Tab value="discover">Discover</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="chat">
            {recentChat.length ? (
              <UserInfoCardList
                recentChatUsers={filteredChat}
                handleProfileClick={handleProfileClick}
                emptyListMsg={`you don't have chat history with the user named : ${searchFilter}`}
              />
            ) : (
              <Alert title="No chat history" color="yellow">
                {"you don't have chat history find user in discover"}
              </Alert>
            )}
          </Tabs.Panel>
          <Tabs.Panel value="discover">
            <UserInfoCardList
              recentChatUsers={recomendation}
              handleProfileClick={handleProfileClick}
              emptyListMsg={`no user in the server with the name : ${searchFilter}`}
            />
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
