import mongoose from "mongoose";

export const commentId = "commentId";
const commentSchema = new mongoose.Schema({
  tweetId: String,
  comment: String,
  createdBy: {
    username: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
  },
  createdAt: { type: Date, default: Date.now },
});

const CommentModel =
  mongoose.models["Comment"] || mongoose.model("Comment", commentSchema);

export default CommentModel;
