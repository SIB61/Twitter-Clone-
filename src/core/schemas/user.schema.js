import mongoose from "mongoose";

export const userId = "userId";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  dateOfBirth: Date,
  profileUrl:String,
  totalFollowers: { type: Number, default: 0 },
  totalFollowings: { type: Number, default: 0 },
  passwordHash:String,
  createdAt:{type:Date,default:Date.now}
});

const UserModel = mongoose.models["User"] || mongoose.model("User", UserSchema);

export default UserModel;
