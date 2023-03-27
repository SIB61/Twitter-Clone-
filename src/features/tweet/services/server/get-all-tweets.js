import TweetModel from "@/core/schemas/tweet.schema";
import { mapId } from "@/shared/utils/mapId";
export async function getAllTweets(){
  const tweets = await TweetModel.find()
  return tweets.map(tweet=>mapId(tweet._doc))
}

