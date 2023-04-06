import axios from "axios";

export async function follow(followingId){
  const followRes = await axios.post(`/api/follow/${followingId}`) 
  return followRes.data
}


export async function unfollow(followingId){
  const followRes = await axios.delete(`/api/follow/${followingId}`) 
  return followRes.data
}
