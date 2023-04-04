import axios from "axios";

export async function PostFollow({followedId}){
  try{
    await axios.post(`/api/follow`,{userId:followedId}) 
    return true
  }catch(err){
    throw false
  }
}
