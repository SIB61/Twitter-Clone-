import { createFollow } from "@/features/user/services/server/create-follow";
import { handleRequest } from "@/shared/middlewares/request-handler";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default handleRequest({

 async POST(req,res){
   try{
   const {user:follower} = await getServerSession(req,res,authOptions)    
   const {userId:followedId} = req.body
   console.log(follower,followedId)
   const follow = await createFollow({follower,followedId}) 
   return res.json(follow)
    } catch(err){
    return res.json(err) 
    }
 }

})
