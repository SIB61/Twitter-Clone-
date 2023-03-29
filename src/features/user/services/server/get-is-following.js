import FollowModel from "@/core/schemas/follow.schema"
export async function getIsFollowing({followedId,followerId}){
  try{
    const isFollowing = await FollowModel.findOne({followId:followedId+followerId}).lean()
    if(isFollowing){
       return true
    } else return false 
  }
  catch(err){
    console.log("error in getFolllowing",err)
    throw {status:500,error:'something went wrong'}
  }
}
