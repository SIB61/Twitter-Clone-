import { dbConnect } from "@/core/utils/db";
import { getAllTweets } from "./get-all-tweets";
import { getTweetListItem } from "./getTweetListItem";

export async function getUserFeed(user){
  await dbConnect()
  let tweets = await getAllTweets();
  tweets = tweets.map(tweet=>getTweetListItem(tweet,user))
  return tweets
}
