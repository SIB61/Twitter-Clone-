import { handleRequest } from "@/shared/middlewares/request-handler";
import TweetModel from "@/core/schemas/tweet.schema";
import { getServerSession } from "next-auth";
import {  createOptions } from "../auth/[...nextauth]";
export default handleRequest({

  async POST(req, res) {
    const { tweetId } = req.body;
    console.log(tweetId)
    const {user} = await getServerSession(req,res,createOptions(req))
    await TweetModel.updateOne({_id:tweetId},{$push:{likes:user.id},$inc:{totalLikes:1}})
    return res.json({message:"liked successfully"})
  },

  async DELETE(req,res) {
    try{
    const { tweetId } = req.query 
    const {user} = await getServerSession(req,res,createOptions(req))
    const tweet = await TweetModel.findOneAndUpdate({_id:tweetId},{$pull:{likes:user.id},$inc:{totalLikes:-1}},{new:true})
    return res.json({tweet})
    }catch(err){
      console.log(err)
      return res.json(err)
    }
  }
});
