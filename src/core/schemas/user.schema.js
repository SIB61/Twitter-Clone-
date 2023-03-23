import mongoose from "mongoose";

export const userId = "userId";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  totalFollowers: { type: Number, default: 0 },
  totalFollowings: { type: Number, default: 0 },
  passwordHash: { type: String, required: true },
  createdAt:{type:Date,default:Date.now}
});

const UserModel = mongoose.models["User"] || mongoose.model("User", UserSchema);

export default UserModel;
