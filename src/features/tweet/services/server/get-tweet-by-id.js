import TweetModel from "@/core/schemas/tweet.schema";
import { mapId } from "@/shared/utils/mapId";

export async function getTweetById(id){
  let tweet = await TweetModel.findById(id).populate('replies').lean()
  tweet.replies = tweet.replies.map(reply=>mapId(reply))
  return mapId(tweet)
}

