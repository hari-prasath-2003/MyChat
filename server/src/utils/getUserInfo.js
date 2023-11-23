import User from "../sharedModel/User.js";

export default async function getUserInfo(userId) {
  const userInfo = await User.findOne(
    { id: userId },
    {
      name: 1,
      profile: 1,
      id: 1,
      _id: 0,
    }
  );
  return userInfo;
}
