import CommentModel from "@/core/schemas/comments.schema";
import TweetModel from "@/core/schemas/tweet.schema";
import { mapId } from "@/shared/utils/mapId";
export async function createComment({content,tweetId,user,commentId}){
  try{
      const promiseOne =  CommentModel.create({tweet:tweetId,user,content,parent:commentId}) 
      const promiseTwo = TweetModel.updateOne({_id:tweetId},{$inc:{totalComments:1}})
      const promiseThree = CommentModel.updateOne({_id:commentId},{$inc:{totalReplies:1}})
      const results = await Promise.all([promiseOne,promiseTwo,promiseThree])
      return mapId(results[0]._doc)
  }catch{
     throw {status:500,error:'error'} 
  } 
}
