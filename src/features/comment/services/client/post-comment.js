import axios from "axios";

export async function postComment({content,tweetId}){
  try{
    console.log(content,tweetId)
    return await axios.post("/api/comment",{content,tweetId}).then(res=>res.data)
  }catch(err){
    throw {error:'can not post'}
  }
}

