import { createReply } from "@/features/comment/services/server/create-reply";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { handleRequest } from "@/shared/middlewares/request-handler";
import { getServerSession } from "next-auth";
export default handleRequest({
    async POST(req,res){
    const {tweetId,commentId} = req.query
    let {content} = req.body
    try{
    const {user} = await getServerSession(req,res,authOptions)
    const reply = await createReply({content,commentId,user,tweetId})   
    return res.json(reply)
    }catch(err){
    throw res.status(err.status || 500).send(err.error || 'Internal server error')
    }
   }
})
