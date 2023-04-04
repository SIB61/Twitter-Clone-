import axios from "axios";
export async function postReply({content,tweetId,commentId}){
  try{
    console.log("post reply",content,tweetId,commentId)
    return await axios.post(`/api/comment`,{content,tweetId,commentId}).then(r=>r.data)
  }catch(err){
    throw {error:'can not post'}
  }
}



