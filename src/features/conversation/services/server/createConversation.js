import Conversation from "@/core/schemas/conversation.schema";
import { mapId } from "@/shared/utils/mapId";

export async function createConversation(userID, receiverID) {
  try {
    const members = [userID, receiverID];
    const messages = [];

    const conversation = await Conversation.create({
      members,
      messages,
    });

    return mapId(conversation._doc);
  } catch (error) {
    throw { status: 500, error: error.message };
  }
}
