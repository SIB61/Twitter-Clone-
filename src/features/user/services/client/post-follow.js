import axios from "axios";

export async function PostFollow({followedId}){
  try{
    await axios.post(`/api/user/${followedId}/follow`,{}) 
    return true
  }catch(err){
    throw false
  }
}
