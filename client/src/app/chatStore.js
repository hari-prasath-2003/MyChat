import { create } from "zustand";

const chatStore = create((set) => ({
  currentReciver: "",
  currentMessage: [],
  conversationId: "",
  setCurrentReciver: (reciver) => set(() => ({ currentReciver: reciver })),
  setConversationId: (convId) => set(() => ({ conversationId: convId })),
  setCurrentMessage: (messages) => set(() => ({ currentMessage: messages })),
  resetCurrentMessage: () => set(() => ({ currentMessage: [] })),
  updateCurrentMessage: ({ senderId, message, timeStamp }) =>
    set((state) => ({
      currentMessage: [
        ...state.currentMessage,
        { senderId, message, timeStamp },
      ],
    })),
}));

export default chatStore;
