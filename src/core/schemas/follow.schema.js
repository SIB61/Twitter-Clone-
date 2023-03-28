import { FOLLOW_SCHEMA, USER_SCHEMA } from "@/constants";
import mongoose from "mongoose";

export const followId = 'followId'
const followSchema = new mongoose.Schema({
  followed:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:USER_SCHEMA
  },
  follower:{
    id: mongoose.Schema.Types.ObjectId,
    username: String,
    email: String,
    name: String,
    image:String
  },
},{
    timestamps:true
  })

const FollowModel = mongoose?.models?.Follow || mongoose.model(FOLLOW_SCHEMA,followSchema)
export default FollowModel
