import CommentModel from "@/core/schemas/comments.schema";
import TweetModel from "@/core/schemas/tweet.schema";
import { mapId } from "@/shared/utils/mapId";

export async function deleteTweet(tweetId){
  try{
    const tweet = await TweetModel.findOneAndDelete({_id:tweetId})
    await CommentModel.deleteMany({tweet:tweetId})
    return mapId(tweet._doc)
  }catch(err){
    return {status:500,error:err.message}
  }
}
