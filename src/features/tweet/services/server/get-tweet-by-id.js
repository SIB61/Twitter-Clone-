import CommentModel from "@/core/schemas/comments.schema";
import TweetModel, { tweetId } from "@/core/schemas/tweet.schema";
import { dbConnect } from "@/core/utils/db";
import { mapId } from "@/shared/utils/mapId";

export async function getTweetById(id){
  try{
  await dbConnect()
  const tweetPromise =  TweetModel.findById(id).lean();
  const commentsPromise =  CommentModel.find({tweet:id,parent:null}).lean();
  const [tweet,comments] = await Promise.all([tweetPromise,commentsPromise])
  tweet.comments = comments.map(comment=>mapId(comment))
  if(tweet) return mapId(tweet)
  throw {status:404,error:'not found'}  
  }
  catch{
  throw {status:404,error:'not found'}  
  }
}

