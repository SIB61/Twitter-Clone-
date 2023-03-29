import FollowModel from "@/core/schemas/follow.schema";
import UserModel from "@/core/schemas/user.schema";
import { mapId } from "@/shared/utils/mapId";
export async function createFollow({followedId,follower}){
  try{
    console.log(followedId,follower)
  const followId = followedId+follower.id
  let follow = await FollowModel.findOneAndRemove({ followId: followId });
  if(follow){
      const followedPromise = UserModel.updateOne({_id:followedId},{$inc:{totalFollowers:-1}})
      const followerPromise = UserModel.updateOne({_id:follower.id},{$inc:{totalFollowings:-1}})
      await Promise.all([followedPromise,followerPromise]) 
      return mapId(follow._doc) 
  }
  const followPromise =  FollowModel.create({
        followId,
        followed:followedId,
        follower:follower
  });
  const followedPromise = UserModel.updateOne({_id:followedId},{$inc:{totalFollowers:1}})
  const followerPromise = UserModel.updateOne({_id:follower.id},{$inc:{totalFollowings:1}})
  const res = await Promise.all([followPromise,followerPromise,followedPromise])
  return res
  } catch(err){
    console.log("error in create follow ",err)
    throw err
  }
}
