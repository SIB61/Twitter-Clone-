import { COMMENT_SCHEMA, TWEET_SCHEMA, USER_SCHEMA } from "@/constants";
import mongoose from "mongoose";
export const commentId = "commentId";
const commentSchema = new mongoose.Schema(
   {
    content: { type: String, required: true },
    tweet: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: TWEET_SCHEMA,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: COMMENT_SCHEMA
    },
    totalReplies: { type: Number, default: 0 },
    totalLikes:{type:Number,default:0},
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
const CommentModel =
  mongoose?.models?.Comment || mongoose.model(COMMENT_SCHEMA, commentSchema);
export default CommentModel;
