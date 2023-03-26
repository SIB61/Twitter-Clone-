import TweetModel, { tweetId } from "@/core/schemas/tweet.schema";
import tweet from "@/pages/api/tweet";
import { mapId } from "@/shared/utils/mapId";
export async function createTweet({post,image,user}){
   try{
   const tweet = await TweetModel.create({post,image,user})
   return mapId(tweet._doc,tweetId)
   } catch(err){
    console.log(err)
    throw {status:500,error:'something went wrong'}
  }
}
