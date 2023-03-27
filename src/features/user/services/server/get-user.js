import UserModel from "@/core/schemas/user.schema";
import { mapId } from "@/shared/utils/mapId";
export async function getUserByEmail(email){
  const user = await UserModel.findOne({email})
  if(user)
  return mapId(user._doc)
}

export async function getUserById(id){
  const user = await UserModel.findById(id)
  if(user)
  return mapId(user._doc)
}

export async function getUser(queryObject){
 const user = await UserModel.findOne(queryObject)
 if(user)
 return mapId(user._doc)
}
