import { COMMENT_SCHEMA, TWEET_SCHEMA, USER_SCHEMA } from "@/constants";
import mongoose from "mongoose";
export const commentId = "commentId";
const commentSchema = new mongoose.Schema(
   {
    comment: { type: String, required: true },
    tweet: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: TWEET_SCHEMA,
    },
    user: {
    id: mongoose.SchemaTypes.ObjectId,
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
  mongoose.models[COMMENT_SCHEMA] || mongoose.model(COMMENT_SCHEMA, commentSchema);
export default CommentModel;
