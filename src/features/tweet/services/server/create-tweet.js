import TweetModel, { tweetId } from "@/core/schemas/tweet.schema";
import { mapId } from "@/shared/utils/mapId";
export async function createTweet({content,image,user}){
   try{
   const tweet = await TweetModel.create({content,image,user})
   return mapId(tweet._doc)
   } catch(err){
    console.log(err)
    throw {status:500,error:'something went wrong'}
  }
}
