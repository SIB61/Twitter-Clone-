import TweetModel from "@/core/schemas/tweet.schema";
import { mapId } from "@/shared/utils/mapId";

export async function updateTweet({tweetId,text,image}) {
  try {
    const newTweet = await TweetModel.findOneAndUpdate({ _id: tweetId }, {content:{text, image}},{new:true});
    return mapId(newTweet._doc) 
  } catch (err) {
      throw { status: 500, error: err.message };
  }
}
