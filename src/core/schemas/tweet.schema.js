import mongoose from "mongoose";

export const tweetId = "tweetId";
const TweetSchema = new mongoose.Schema({
  post: String,
  imgUrl: String,
  totalLikes: { type: Number, default: 0 },
  totalComments: { type: Number, default: 0 },
  latestComment: {
    commentId: { type: String, required: true },
    comment: { type: String, required: true },
    createdBy: {
      username: { type: String, required: true },
      email: { type: String, required: true },
      name: { type: String, required: true },
      dateOfBirth: { type: Date, required: true },
    },
    createdAt: { type: Date , required:true},
  },
  createdBy: {
    userId: String,
    username: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    dateOfBirth: { type: Date,  required: true },
  },
  createdAt: { type: Date, default: Date.now },
});

const TweetModel =
  mongoose.models["Tweet"] || mongoose.model("Tweet", TweetSchema);

export default TweetModel;
