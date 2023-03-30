import { tweets as tweetList } from "@/db.mock"
import { TweetView } from "../tweet-view/TweetView"

export function TweetList({tweets=tweetList}){
  return tweets.map((tweet)=>(
    <TweetView  key={tweet.id} tweet={tweet}/> 
  ))
}



