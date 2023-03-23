import mongoose from "mongoose";

export const followId = 'followId'
const followSchema = new mongoose.Schema({
  followedUserId:String,
  follower:{
    userId:String,
    username: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    dateOfBirth: { type: Date,  required: true },
  },
  createdAt:{type:Date,default:Date.now}
})

const FollowModel = mongoose.models['Follow'] || mongoose.model('Follow',followSchema)
export default FollowModel
