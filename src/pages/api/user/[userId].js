import TweetModel from "@/core/schemas/tweet.schema"
import UserModel from "@/core/schemas/user.schema"
import { handleRequest } from "@/shared/middlewares/request-handler"
import { mapId } from "@/shared/utils/mapId"
import { parseForm } from "@/shared/utils/parse-form"
import { createOptions } from "../auth/[...nextauth]"
import { getServerSession } from "next-auth"

export const config = {
  api:{
    bodyParser:false
  }
}

export default handleRequest({
  PATCH:async(req,res)=>{
    try{
    const {files,fields} = await parseForm(req)   
    const {userId} = req.query
    const {user:myUser} = await getServerSession(req,res,createOptions(req));
    if(myUser.id != userId){
       return res.status(400).send("do not have access to modify") 
    }
    const profilePic = files.image? 'http://localhost:3000/uploads/' + files.image?.newFilename : undefined
    const coverPic = files.cover? 'http://localhost:3000/uploads/' + files.cover?.newFilename : undefined
    let updatedUser = await UserModel.findOneAndUpdate({_id:userId},{
      ...fields,
      image:profilePic,
      cover:coverPic
    },{new:true})
    const {id,name,username,image} = mapId(updatedUser._doc)
    const user = {id,name,username,image} 
    await TweetModel.updateMany({"user.id":id},{user:user})
    const {passwordHash,...updatedUserWithoutPass }= mapId(updatedUser._doc) 
    return res.status(200).send(JSON.stringify(updatedUserWithoutPass))
    }catch(err){
      return res.status(500).send()
    }
  }
})
