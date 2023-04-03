import UserModel from "@/core/schemas/user.schema";

export function deleteUser(userId){
  try{
     const user = UserModel.deleteOne({_id:userId})
  }
  catch(err){

  }
}
