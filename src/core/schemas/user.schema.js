import { USER_SCHEMA } from "@/constants";
import mongoose from "mongoose";
export const userId = "userId";
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  name: String,
  dateOfBirth: Date,
  image:String,
  totalFollowers: { type: Number, default: 0 },
  totalFollowings: { type: Number, default: 0 },
  passwordHash:String,
  createdAt:{type:Date,default:Date.now}
});

const UserModel = mongoose.models[USER_SCHEMA] || mongoose.model(USER_SCHEMA, UserSchema);

export default UserModel;
