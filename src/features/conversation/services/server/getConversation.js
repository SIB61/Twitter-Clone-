import Conversation from "@/core/schemas/conversation.schema";
import { mapId } from "@/shared/utils/mapId";

export async function getAllConversationsForUser({ userId, receiverID }) {
  try {
    const fetchedConversations = await Conversation.findOne({
      members: { $all: [userId, receiverID] },
    }).sort({ createdAt: -1 });

    console.log(fetchedConversations);

    fetchedConversations.messages.forEach((message) => {
      if (message.sender !== receiverID) {
        message.seen = true;
      }
    });

    await fetchedConversations.save();

    const conversations = await Conversation.find({
      members: { $all: [userId, receiverID] },
    })
      .select("messages")
      .sort({ createdAt: -1 })
      .limit(1)
      .lean();

    console.log(conversations);
    return conversations[0]?.messages.map((msg) => mapId(msg)) || [];
  } catch (error) {
    throw { status: 500, message: error.message };
  }
}
