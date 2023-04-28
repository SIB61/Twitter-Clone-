import Conversation from "@/core/schemas/conversation.schema";
import { mapId } from "@/shared/utils/mapId";
import mongoose from "mongoose";

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
    // const conversation = await Conversation.find({
    //   members: { $all: [userId, receiverID] },
    // });
    // console.log(conversation);
    const messages = await Conversation.aggregate([
      { $match: { members: { $all: [objectIdUserId, objectIdReceiverId] } } },
      { $unwind: "$messages" },
      {
        $project: {
          _id: 0,
          message: "$messages",
        },
      },
      { $sort: { "messages.createdAt": -1 } },
      { $skip: (pageIndex - 1) * pageSize },
      { $limit: pageSize },
      { $replaceRoot: { newRoot: "$message" } },
    ]);
    //console.log(messages);
    return messages?.map((msg) => mapId(msg)) || [];
    //console.log(conversations);
  } catch (error) {
    throw { status: 500, message: error.message };
  }
}
