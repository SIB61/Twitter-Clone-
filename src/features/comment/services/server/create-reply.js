import CommentModel from "@/core/schemas/comments.schema"
import ReplyModel from "@/core/schemas/reply.schema"
import TweetModel from "@/core/schemas/tweet.schema"
import { mapId } from "@/shared/utils/mapId"

export async function createReply({content,user,commentId,tweetId}){
  try{
      const replyCreatePromise =  CommentModel.create({comment:commentId,user,content,tweet:tweetId}) 
      const parentCommentUpdatePromise =  CommentModel.updateOne({_id:commentId},{$inc:{totalReplies:1}})
      const tweetUpdatePromise = TweetModel.updateOne({_id:tweetId},{$inc:{totalComments:1}})
      const [reply,_comment,,_tweet] = await Promise.all([replyCreatePromise,parentCommentUpdatePromise,tweetUpdatePromise])
      return mapId(reply._doc)
  }catch{
     throw {status:500,error:'error'} 
  } 
}
