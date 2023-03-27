import { dbConnect } from "@/core/utils/db";
import { getAllTweets } from "./get-all-tweets";
import LikeModel from "@/core/schemas/likes.schema";

export async function getUserFeed(user){
  await dbConnect()
  let tweets = await getAllTweets();
  const likeIds = tweets.map((tweet) => tweet.id + user.id);
  const likes = await LikeModel.find({ likeId: { $in: likeIds } });
  let likedTweetIds = likes.map((like) => like.tweet.toString());
  likedTweetIds = new Set(likedTweetIds)
  tweets = tweets.map((tweet) =>({...tweet,isLiked:likedTweetIds.has(tweet.id.toString())}));
  return tweets
}

