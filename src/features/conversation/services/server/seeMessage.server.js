import Conversation from "@/core/schemas/conversation.schema";

export async function seeMessage({ messageId }) {
  try {
    console.log(messageId)
    await Conversation.update(
      {
        "messages._id": messageId,
      },
      {
        $set: { "messages.$.seen": true },
      }
    );
    return true;
  } catch (err) {
    return false;
  }
}
