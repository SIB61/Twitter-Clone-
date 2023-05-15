// import FollowModel from "@/core/schemas/follow.schema";
// import UserModel from "@/core/schemas/user.schema";
// import { mapId } from "@/shared/utils/mapId";
//
// export async function getFollowings(userId){
//   try{
//   const followings = await FollowModel.find({"follower.id":userId},"followed").populate("followed").lean()
//   const followingUsers = followings.map(following=>following.followed) 
//   return followingUsers.map(user=>mapId(user))
//   } catch(err){
//     console.log("error in getFollowings", err)
//     throw err
//   }
// }
