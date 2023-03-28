import LikeModel from "@/core/schemas/likes.schema";
export async function getIsLiked({userId,tweetId}){
  try{
    const isLiked = await LikeModel.findOne({likeId:tweetId+userId}).lean()
    if(isLiked){
       return true
    } else return false 
  }
  catch{
    throw {status:500,error:'something went wrong in getIsLiked'}
  }
}
