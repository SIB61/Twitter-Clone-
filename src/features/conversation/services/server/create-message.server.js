import Conversation from "@/core/schemas/conversation.schema";
import { createConversation } from "./createConversation";

export async function createMessage({
  text,
  file,
  sender,
  receiver,
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
    const conversations = await Conversation.find({members:{$all:[sender,receiver]}}).sort({createdAt:-1}).limit(1);
    let conversation
    if(!conversations || conversations.length === 0  ){
      conversation = await createConversation(sender,receiver)
    }
    else{
      conversation = conversations[0]
    }
    if (conversation.messages.length < 50) {
      conversation.messages.push(message);
      conversation.lastMessage = {
        text,
        file,
        sender,
      };
      await conversation.save();
    } else {
      const newConversation = await createConversation(sender, receiver);
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
