import Conversation from "@/core/schemas/conversation.schema";
import { mapId } from "@/shared/utils/mapId";

export async function getAllConversationsForUser({ userID, receiverID }) {
  try {
    const conversations = await Conversation.find({
      members: { $all: [userID, receiverID] },
    })
      .populate({
        path: "members",
        select: {
          name: 1,
          username: 1,
          email: 1,
          profilePicture: 1,
        },
      })
      .populate({
        path: "messages.sender",
        select: {
          name: 1,
          username: 1,
          email: 1,
          profilePicture: 1,
        },
      })
      .sort({ createdAt: -1 });
    return mapId(conversations._doc);
  } catch (error) {
    throw { status: 500, message: error.message };
  }
}
