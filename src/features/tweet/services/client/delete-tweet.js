import axios from "axios";

export async function deleteTweet(tweetId){
  try{
    await axios.delete(`/api/tweet/${tweetId}`)  
    return true
  }catch(err){
    return false
  }
}
