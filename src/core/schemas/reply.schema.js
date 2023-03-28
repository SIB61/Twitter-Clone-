import { COMMENT_SCHEMA, TWEET_SCHEMA, USER_SCHEMA } from "@/constants";
import mongoose from "mongoose";
const replySchema = new mongoose.Schema(
   {
    content: { type: String, required: true },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: COMMENT_SCHEMA,
    },
    user: {
    id: mongoose.Schema.Types.ObjectId,
    username: String,
    email: String,
    name: String,
    image:String
    },
  },
  {
    timestamps: true,
  }
);

const ReplyModel =
  mongoose?.models?.Reply || mongoose.model("Reply", replySchema);
export default ReplyModel;
