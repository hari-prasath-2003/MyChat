import { useEffect, useRef } from "react";
import Chat from "../services/chat";
import chatStore from "../app/chatStore";
import api from "../services/api";

export default function useChat({ userId, receiverId }) {
  const setCurrentMessage = chatStore((state) => state.setCurrentMessage);
  const updateCurrentMessage = chatStore((state) => state.updateCurrentMessage);

  const chat = useRef(null);
  const sendMsg = useRef(null);

  useEffect(() => {
    const getPreviousChat = async () => {
      const previousChat = await api.get(
        "/chat?" + "user1=" + userId + "&user2=" + receiverId
      );
      setCurrentMessage(previousChat);
    };
    getPreviousChat();
  }, [userId, receiverId, setCurrentMessage]);

  useEffect(() => {
    chat.current = new Chat(userId, receiverId);
    chat.current.onMsg(updateCurrentMessage);
    sendMsg.current = (message) => {
      chat.current.sendMsg(message);
      updateCurrentMessage({ senderId: userId, message });
    };

    return () => chat.current.destroy();
  }, [userId, receiverId]);

  return { sendMsg: sendMsg.current };
}
