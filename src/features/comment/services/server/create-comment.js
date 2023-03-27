import CommentModel from "@/core/schemas/comments.schema";
import TweetModel from "@/core/schemas/tweet.schema";
import { mapId } from "@/shared/utils/mapId";
export async function createComment({comment,tweetId,user}){
  try{
      const commentModel = await CommentModel.create({comment,tweet:tweetId,user}) 
      await TweetModel.updateOne({_id:tweetId},{$inc:{totalComments:1}})
      return mapId(commentModel)
  }catch{
     throw {status:500,error:'error'} 
  } 
}
