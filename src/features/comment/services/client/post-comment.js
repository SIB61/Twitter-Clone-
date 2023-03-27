import axios from "axios";

export async function postComment({comment,tweetId}){
  try{
    return await axios.post(`/api/tweet/${tweetId}/comment`,{comment})
  }catch(err){
    throw {error:'can not post'}
  }
}



