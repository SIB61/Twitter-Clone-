import axios from "axios";
export async function postReply({content,tweetId,commentId}){
  try{
    return await axios.post(`/api/tweet/${tweetId}/${commentId}/reply`,{content})
  }catch(err){
    throw {error:'can not post'}
  }
}



