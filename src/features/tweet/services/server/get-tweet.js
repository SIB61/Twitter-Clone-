import TweetModel, { tweetId } from "@/core/schemas/tweet.schema";
import { dbConnect } from "@/core/utils/db";
import { mapId } from "@/shared/utils/mapId";

export async function getTweetById(id){
  await dbConnect()
  const tweet = await TweetModel.findById(id)
  if(tweet) return mapId(tweet._doc)
  else return null
}
