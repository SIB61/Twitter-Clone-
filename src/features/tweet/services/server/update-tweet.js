import TweetModel from "@/core/schemas/tweet.schema";
import { mapId } from "@/shared/utils/mapId";
import mongoose from "mongoose";

export async function updateTweet(id, { image, content }) {
  try {
    const newTweet = await TweetModel.findOneAndUpdate({ _id: id }, { content:{text:content, image: image } },{new:true});
    return mapId(newTweet._doc) 
  } catch (err) {
    if (err instanceof mongoose.Error) {
      throw { status: 500, error: err.message };
    }
  }
}
