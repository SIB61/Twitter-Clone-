// import { createComment } from "@/features/comment/services/server/create-comment";
// import { handleRequest } from "@/shared/middlewares/request-handler";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]";
// export default handleRequest({
//     async POST(req,res){
//     let {tweetId,content,commentId} = req.body
//     try{
//     console.log(tweetId,content,commentId)
//     const {user} = await getServerSession(req,res,authOptions)
//     const newComment = await createComment({content,tweetId,user,commentId})   
//     return res.json(newComment)
//     }catch(err){
//     return res.status(err.status || 500).send(err.error || 'Internal server error')
//     }
//    }
// })
//
