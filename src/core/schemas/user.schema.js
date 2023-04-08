import { TWEET_SCHEMA, USER_SCHEMA } from "@/constants";
import mongoose from "mongoose";
export const userId = "userId";
const UserSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    name: String,
    dateOfBirth: Date,
    image: String,
    cover: String,
    passwordHash: String,
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: USER_SCHEMA }],
    followings: [{ type: mongoose.Schema.Types.ObjectId, ref: USER_SCHEMA }],
    tweets: [{ type: mongoose.Schema.Types.ObjectId, ref: TWEET_SCHEMA }],
    totalFollowers: { type: Number, default: 0, min:0 },
    totalFollowings: { type: Number, default: 0, min:0 },
    totalTweets: { type: Number, default: 0, min:0 },
  },
  { timestamps: true },
  {
    toJSON: { getters: true },
  }
);

const UserModel =
  mongoose?.models?.User || mongoose?.model(USER_SCHEMA, UserSchema);
export default UserModel;
