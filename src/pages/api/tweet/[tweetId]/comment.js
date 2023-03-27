import { createComment } from "@/features/comment/services/server/create-comment";
import { handleRequest } from "@/shared/middlewares/request-handler";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
export default handleRequest({
    async POST(req,res){
    const {tweetId} = req.query
    let {comment} = req.body
    try{
    const {user} = await getServerSession(req,res,authOptions)
    comment = await createComment({comment,tweetId,user})   
    return res.json(comment)
    }catch(err){
    throw res.status(err.status || 500).send(err.error || 'Internal server error')
    }
   }
})
