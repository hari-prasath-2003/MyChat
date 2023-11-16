import { create } from "zustand";

const userStore = create((set) => ({
  userId: "",
  userProfile: "",
  userName: "",
  setUser: ({ userId, userProfile, userName }) =>
    set(() => ({
      userId: userId,
      userProfile: userProfile,
      userName: userName,
    })),
}));

export default userStore;
