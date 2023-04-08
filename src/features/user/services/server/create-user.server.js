import UserModel from "@/core/schemas/user.schema";
import { mapId } from "@/shared/utils/mapId";
import { genSalt, genSaltSync, hashSync } from "bcryptjs";
export default async function createUser({name,username,email,password,dateOfBirth}){
  try{
  const passwordHash = hashSync(password,genSaltSync(8))
  const user = UserModel.create({name,username,email,passwordHash,dateOfBirth})
  return mapId(user._doc)
  } catch(err){
   console.log(err)
   throw {status:500,error:err.message}
  }
}
