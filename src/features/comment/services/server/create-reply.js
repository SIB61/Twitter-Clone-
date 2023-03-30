import CommentModel from "@/core/schemas/comments.schema"
import TweetModel from "@/core/schemas/tweet.schema"
import comment from "@/pages/api/tweet/[tweetId]/comment"
import { mapId } from "@/shared/utils/mapId"

export async function createReply({content,user,commentId,tweetId}){
  try{
      console.log(commentId)
      const replyCreatePromise =  CommentModel.create({parent:commentId,user,content,tweet:tweetId}) 
      const parentCommentUpdatePromise =  CommentModel.updateOne({_id:commentId},{$inc:{totalReplies:1}})
      const tweetUpdatePromise = TweetModel.updateOne({_id:tweetId},{$inc:{totalComments:1}})
      const [reply,_comment,,_tweet] = await Promise.all([replyCreatePromise,parentCommentUpdatePromise,tweetUpdatePromise])
      console.log(reply._doc)
      return mapId(reply._doc)
  }catch{
     throw {status:500,error:'error'} 
  } 
}
