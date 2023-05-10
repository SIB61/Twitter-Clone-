import UserModel from "@/core/schemas/user.schema";

export async function follow({followerId,followingId}){
  try{
  const promise1 =  UserModel.updateOne({_id:followerId},{$push:{'followings':followingId},$inc:{totalFollowings:1}}) 
  const promise2 = UserModel.updateOne({_id:followingId},{$push:{'followers':followerId},$inc:{totalFollowers:1}}) 
  await Promise.all([promise1,promise2])
  return true
  }catch(err){
  console.log(err)
  throw err
  }
}

export async function unfollow({followerId,followingId}){
  try{
  const promise1 = UserModel.updateOne({_id:followerId},{$pull:{'followings':followingId},$inc:{totalFollowings:-1}}) 
  const promise2 = UserModel.updateOne({_id:followingId},{$pull:{'followers':followerId},$inc:{totalFollowers:-1}}) 
  await Promise.all([promise1,promise2])
  return true
  }catch(err){
  console.log(err)
  throw err
  }
}
