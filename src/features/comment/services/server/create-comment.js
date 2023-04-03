import CommentModel from "@/core/schemas/comments.schema";
import TweetModel from "@/core/schemas/tweet.schema";
import { mapId } from "@/shared/utils/mapId";
export async function createComment({content,tweetId,user}){
  try{
      const commentModel = await CommentModel.create({tweet:tweetId,user,content}) 
      await TweetModel.updateOne({_id:tweetId},{$inc:{totalComments:1}})
      return mapId(commentModel._doc)
  }catch{
     throw {status:500,error:'error'} 
  } 
}
