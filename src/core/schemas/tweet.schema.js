import { TWEET_SCHEMA, USER_SCHEMA } from "@/constants";
import mongoose from "mongoose";
export const tweetId = "tweetId";
const TweetSchema = new mongoose.Schema({
  post: String,
  image: String,
  totalLikes: { type: Number, default: 0 },
  totalComments: { type: Number, default: 0 },
  user: {
    id: mongoose.SchemaTypes.ObjectId,
    username: String,
    email: String,
    name: String,
    image:String
  },
},{timestamps:true});

const TweetModel =
  mongoose.models[TWEET_SCHEMA] || mongoose.model(TWEET_SCHEMA, TweetSchema);

export default TweetModel;
