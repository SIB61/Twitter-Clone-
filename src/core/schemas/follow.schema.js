import { FOLLOW_SCHEMA, USER_SCHEMA } from "@/constants";
import mongoose from "mongoose";

export const followId = 'followId'
const followSchema = new mongoose.Schema({
  followed:{
    type:mongoose.SchemaTypes.ObjectId,
    required:true,
    ref:USER_SCHEMA
  },
  follower:{
    id: mongoose.SchemaTypes.ObjectId,
    username: String,
    email: String,
    name: String,
    image:String
  },
},{
    timestamps:true
  })

const FollowModel = mongoose.models[FOLLOW_SCHEMA] || mongoose.model(FOLLOW_SCHEMA,followSchema)
export default FollowModel
