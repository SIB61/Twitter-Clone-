import Conversation from "@/core/schemas/conversation.schema";
import { createConversation } from "./createConversation";

export async function createMessage({
  text,
  file,
  sender,
  conversationID,
  originalMessage,
}) {
  try {
    const message = {
      content: {
        text,
        file,
      },
      sender,
      originalMessage,
    };

    const conversation = await Conversation.findById(conversationID);
    if (conversation.messages.length < 50) {
      conversation.messages.push(message);
      conversation.lastMessage = {
        text,
        file,
        sender,
      };

      await conversation.save();
    } else {
      const userID = conversation.members[0];
      const receiverID = conversation.members[1];

      const newConversation = await createConversation(userID, receiverID);

      await Conversation.updateOne(
        { _id: newConversation._id },
        { $push: { messages: message } }
      );

      newConversation.messages.push(message);
      newConversation.lastMessage = {
        text,
        file,
        sender,
      };

      await newConversation.save();
    }
    return message;
  } catch (error) {
    throw { status: 500, error: error.message };
  }
}
