import { handleRequest } from "@/shared/middlewares/request-handler";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import {  follow,  unfollow } from "@/features/user/services/server/follow.server";

export default handleRequest({

 async POST(req,res){

    const {user:follower} = await getServerSession(req,res,authOptions)
    const {id:followingId} = req.query
    const followRes  = await follow({followerId:follower.id,followingId:followingId})
    res.json(followRes)
 },

  DELETE:async(req,res)=>{
    const {user:follower} = await getServerSession(req,res,authOptions)
    const {id:followingId} = req.query
    const unfollowRes  = await unfollow({followerId:follower.id,followingId:followingId})
    res.json(unfollowRes)
  }

})
