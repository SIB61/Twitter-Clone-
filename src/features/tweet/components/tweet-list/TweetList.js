import { TweetView } from "../tweet-view/TweetView"
import { tweets as tweetList } from "@/db.mock"

export function TweetList({tweets=tweetList}){
  return tweets.map((tweet,index)=>(
    <TweetView key={index} tweet={tweet}/> 
  ))
}



