import { TweetView } from "../tweet-view/TweetView"
export function TweetList({tweets}){
  return tweets.map((tweet,index)=>(
    <TweetView key={index} tweet={tweet}/> 
  ))
}
