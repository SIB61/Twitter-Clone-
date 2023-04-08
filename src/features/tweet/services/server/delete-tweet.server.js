import TweetModel from "@/core/schemas/tweet.schema";
import UserModel from "@/core/schemas/user.schema";
import { mapId } from "@/shared/utils/mapId";

export async function deleteTweet(tweetId){
  try{
    const tweet = await  TweetModel.findOneAndDelete({_id:tweetId})
    const promise1 = UserModel.updateOne({_id:tweet.user.id},{$pull:{tweets:tweet._id} , $inc:{totalTweets:-1}})
    const promise2 = TweetModel.deleteMany({origin:tweet._id, type:'reply'})
    await Promise.all([promise1,promise2])
    console.log(tweet)
    return mapId(tweet._doc)
  }catch(err){
    return {status:500,error:err.message}
  }
}
