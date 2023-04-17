import Conversation from "@/core/schemas/conversation.schema";
import { createConversation } from "./createConversation";

export async function createMessage({ text, file, sender, conversationID }) {
  try {
    const message = {
      content: {
        text,
        file,
      },
      sender,
      senderReact: "",
      receiverReact: "",
    };

    const conversation = await Conversation.findById(conversationID);
    if (conversation.messages.length < 50) {
      await Conversation.updateOne(
        { _id: conversationID },
        { $push: { messages: message } }
      );
    } else {
      const userID = conversation.members[0];
      const receiverID = conversation.members[1];

      const newConversation = await createConversation(userID, receiverID);

      await Conversation.updateOne(
        { _id: newConversation._id },
        { $push: { messages: message } }
      );
    }
  } catch (error) {
    throw { status: 500, error: error.message };
  }
}
