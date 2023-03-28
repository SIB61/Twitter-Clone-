import { TWEET_SCHEMA } from "@/constants";
import mongoose from "mongoose";
export const tweetId = "tweetId";
const TweetSchema = new mongoose.Schema({
  content: String,
  image: String,
  totalLikes: { type: Number, default: 0 },
  totalComments: { type: Number, default: 0 },
  user: {
    id: mongoose.Schema.Types.ObjectId,
    username: String,
    email: String,
    name: String,
    image:String
  },
},{timestamps:true});

const TweetModel =
  mongoose?.models?.Tweet || mongoose.model(TWEET_SCHEMA, TweetSchema);

export default TweetModel;
