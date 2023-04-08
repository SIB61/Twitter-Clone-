import TweetModel from "@/core/schemas/tweet.schema";
import { mapId } from "@/shared/utils/mapId";

export async function getAllTweets(){
  const tweets = await TweetModel.find({type:'tweet'}).sort({createdAt:-1}).lean()
  return tweets.map(tweet=>mapId(tweet))
}

export async function getTweetById(id){
  let tweet = await TweetModel.findById(id).populate('replies').lean()
  tweet.replies = tweet.replies.map(reply=>mapId(reply))
  return mapId(tweet)
}

