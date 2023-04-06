import UserModel from "@/core/schemas/user.schema";

export async function follow({followerId,followingId}){
  try{
  const promise1 =  UserModel.updateOne({_id:followerId},{$push:{'followings':followingId}}) 
  const promise2 = UserModel.updateOne({_id:followingId},{$push:{'followers':followerId}}) 
  await Promise.all([promise1,promise2])
  return true
  }catch(err){
  console.log(err)
  return false
  }
}

export async function unfollow({followerId,followingId}){
  try{
  const promise1 = UserModel.updateOne({_id:followerId},{$pull:{'followings':followingId}}) 
  const promise2 = UserModel.updateOne({_id:followingId},{$pull:{'followers':followerId}}) 
  await Promise.all([promise1,promise2])
  return true
  }catch(err){
  console.log(err)
  return false
  }
}
