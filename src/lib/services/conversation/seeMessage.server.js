import Conversation from "@/lib/models/conversation.schema";

export async function seeMessage({ messageIds }) {
  try {
    await Conversation.updateMany(
      {
        "messages._id": {$in:messageIds},
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
