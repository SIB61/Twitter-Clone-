import TweetModel, { tweetId } from "@/core/schemas/tweet.schema";
import { mapId } from "@/shared/utils/mapId";

export async function getTweetById(id){
  const tweet = await TweetModel.findById(id)
  if(tweet) return mapId(tweet._doc,tweetId)
  else return null
}
