import UserModel from "@/core/schemas/user.schema";
import { mapId } from "@/shared/utils/mapId";
export default async function createUser(user){
  try{
  const userModel = new UserModel(user)
  const savedUser = await userModel.save()
  return mapId(savedUser._doc)
  } catch(err){
   console.log(err)
   throw {status:500,message:'internal server error'}
  }
}
