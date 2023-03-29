import FollowModel from "@/core/schemas/follow.schema";
import { mapId } from "@/shared/utils/mapId";

export async function getFollowers(userId){
  try{
  const followers = await FollowModel.find({followed:userId},"follower").lean()
  return followers.map(follower=>follower.follower)
  } catch(err){
    console.log("error in getFollowings", err)
    throw err
  }
}
