import axios from "axios";

export async function postComment({content,tweetId}){
  try{
    return await axios.post(`/api/tweet/${tweetId}/comment`,{content}).then(res=>res.data)
  }catch(err){
    throw {error:'can not post'}
  }
}



