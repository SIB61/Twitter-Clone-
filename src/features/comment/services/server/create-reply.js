import CommentModel from "@/core/schemas/comments.schema"
import ReplyModel from "@/core/schemas/reply.schema"

export async function createReply({content,user,commentId}){
  try{
      const replyModel = await ReplyModel.create({comment:commentId,user,content}) 
      await CommentModel.updateOne({_id:commentId},{$inc:{totalReplies:1}})
      return replyModel
  }catch{
     throw {status:500,error:'error'} 
  } 
}
