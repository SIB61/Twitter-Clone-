import UserModel, { userId } from "@/core/schemas/user.schema";
import { mapId } from "@/shared/utils/mapId";
export default async function createUser(user){

  const existingUser = await UserModel.findOne({
    $or:[{email:user.email},{username:user.username}]
  })

  if(existingUser)
  {
     throw {status:409,message:'email or username allready exists'}
  }

  try{
  const userModel = new UserModel(user)
  const savedUser = await userModel.save()
  const mappedUser = mapId(savedUser._doc,userId)
  return mappedUser
  } catch(err){
   console.log(err)
   throw {status:500,message:'internal server error'}
  }
}
