import axios from "axios";

export async function postComment({content,tweetId}){
  try{
    return await axios.post(`/api/tweet/${tweetId}/comment`,{content})
  }catch(err){
    throw {error:'can not post'}
  }
}



