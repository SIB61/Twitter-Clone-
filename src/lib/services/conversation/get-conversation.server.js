import Conversation from "@/lib/models/conversation.schema";
import mongoose from "mongoose";
import { seeMessage } from "./seeMessage.server";
import { mapId } from "@/utils/mapId";

export async function getAllConversationsByUser({
  userId,
  receiverID,
  pageIndex,
  pageSize = 30,
}) {
  try {
    console.log(userId + " " + receiverID + " " + pageIndex);
    const objectIdUserId = new mongoose.Types.ObjectId(userId);
    const objectIdReceiverId = new mongoose.Types.ObjectId(receiverID);
    let messages = await Conversation.aggregate([
      { $match: { members: { $all: [objectIdUserId, objectIdReceiverId] } } },
      { $unwind: "$messages" },
      {
        $project: {
          _id: 0,
          message: "$messages",
        },
      },
      { $sort: { "message.createdAt": -1 } },
      { $skip: (pageIndex - 1) * pageSize },
      { $limit: pageSize },
      { $replaceRoot: { newRoot: "$message" } },
    ]);

    let unseenMessages = [];
    messages =
      messages?.map((msg) => {
        if (!msg.seen && msg.sender.toString() === receiverID.toString()) {
          unseenMessages.push(msg._id);
          msg.seen = true;
        }
        return mapId(msg);
      }) || [];

    if (unseenMessages.length != 0) {
      seeMessage({ messageIds: unseenMessages });
    }

    console.log("unseen", unseenMessages);

    return messages;
  } catch (error) {
    throw { status: 500, message: error.message };
  }
}
