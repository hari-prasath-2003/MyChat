import { create } from "zustand";

const chatStore = create((set) => ({
  currentReciver: "",
  currentMessage: [],
  recentChat: [],
  recomendedUser: [],
  setCurrentReciver: (reciver) => set(() => ({ currentReciver: reciver })),
  setCurrentMessage: (messages) => set(() => ({ currentMessage: messages })),
  updateCurrentMessage: ({ senderId, message, timeStamp }) =>
    set((state) => ({
      currentMessage: [
        ...state.currentMessage,
        { senderId, message, timeStamp },
      ],
    })),
  setRecentChat: (recentChat) => set(() => ({ recentChat: recentChat })),
  updateRecentChat: (msg) => {
    set((state) => {
      const senderId = msg.sender.id;
      const lastMessage = msg.message;

      const msgSender = { ...msg.sender, lastMessage: lastMessage };

      const filteredUserInfo = state.recentChat.filter(
        (user) => user.id !== senderId
      );

      return { recentChat: [msgSender, ...filteredUserInfo] };
    });
  },
}));

export default chatStore;
