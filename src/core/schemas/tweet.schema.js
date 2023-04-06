import { TWEET_SCHEMA, USER_SCHEMA } from "@/constants";
import mongoose from "mongoose";
export const tweetId = "tweetId";
const TweetSchema = new mongoose.Schema(
  {
    content: {
      text: String,
      image: String,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: USER_SCHEMA }],
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: TWEET_SCHEMA }],
    retweets:[{type:mongoose.Schema.Types.ObjectId, ref:TWEET_SCHEMA}],
    parent: { type: mongoose.Schema.Types.ObjectId, ref: TWEET_SCHEMA },
    user: {
      id: mongoose.Schema.Types.ObjectId,
      username: String,
      name: String,
      image: String,
    },
    type:{type:String, default:'tweet'}
  },
  { timestamps: true }
);

const TweetModel =
  mongoose?.models?.Tweet || mongoose.model(TWEET_SCHEMA, TweetSchema);

export default TweetModel;
