import UserModel from "@/core/schemas/user.schema";
export async function createFollow({userId,followingId}){
  try{
    const user = await UserModel.findById(userId).select('followings').lean()

    if(user.followings.includes(followingId)){

    }else{

    }

  } catch(err){
    console.log("error in create follow ",err)
    throw err
  }
}
