import getUserInfo from "../../utils/getUserInfo.js";

export async function userInfoHandler(req, res) {
  const userId = req.userId;

  const userInfo = await getUserInfo(userId);

  res.json(userInfo);
}
