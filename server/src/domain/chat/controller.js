import User from "../../sharedModel/User.js";
import getUserInfo from "../../utils/getUserInfo.js";
import Chat from "./model/chat.js";
import Conversation from "./model/conversation.js";

export async function recentChatHandler(req, res) {
  try {
    const userId = req.userId;
    const userContact = await Conversation.find({
      users: { $in: [userId] },
    });

    const userChat = await Promise.all(
      userContact.map(async ({ users, conversationId }) => {
        const otherUserId = users.find((user) => user !== userId);
        const userInfo = await getUserInfo(otherUserId);
        const lastMessage = await Chat.findOne(
          {
            conversationId: conversationId,
          },
          { message: 1, _id: 0 }
        ).sort({ _id: -1 });

        return {
          name: userInfo.name,
          profile: userInfo.profile,
          id: userInfo.id,
          conversationId: conversationId,
          lastMessage: lastMessage?.message || "",
        };
      })
    );

    res.json(userChat);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("server error");
  }
}

export async function recomendationHandler(req, res) {
  const nameFilter = req.query.filter;
  const userRec = await User.find(
    { id: { $ne: req.userId }, name: { $regex: nameFilter, $options: "i" } },
    { name: 1, profile: 1, id: 1, _id: 0 }
  ).limit(20);

  res.json(userRec);
}

export async function getChatByConvId(req, res) {
  const user1 = req.query.user1;
  const user2 = req.query.user2;
  const conversation = await Conversation.findOne(
    { users: { $all: [user1, user2] } },
    { conversationId: 1, _id: 0 }
  );
  const previousChats = await Chat.find({
    conversationId: conversation?.conversationId,
  });
  res.json(previousChats);
}
