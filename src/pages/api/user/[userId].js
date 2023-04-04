import CommentModel from "@/core/schemas/comments.schema"
import FollowModel from "@/core/schemas/follow.schema"
import TweetModel from "@/core/schemas/tweet.schema"
import UserModel from "@/core/schemas/user.schema"
import { handleRequest } from "@/shared/middlewares/request-handler"
import { mapId } from "@/shared/utils/mapId"
import { parseForm } from "@/shared/utils/parse-form"

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
    const image = files.image? 'http://localhost:3000/uploads/' + files.image?.newFilename : undefined
    const coverPic = files.cover? 'http://localhost:3000/uploads/' + files.cover?.newFilename : undefined
    let updatedUser = await UserModel.findOneAndUpdate({_id:userId},{
      ...fields,
      image:image,
      cover:coverPic
    },{new:true})

    const {id,name,username,email,image:profilePic} = mapId(updatedUser._doc)
    const user = {id,name,username,email,image:profilePic} 
    const commmentPromise =  CommentModel.updateMany({"user.id":userId},{user:user})
    const tweetPromise = TweetModel.updateMany({"user.id":userId},{user:user})
    const followPromise = FollowModel.updateMany({"follower.id":userId},{user:user})
    await Promise.all([commmentPromise,tweetPromise,followPromise])
    const {passwordHash,...updatedUserWithoutPass }= mapId(updatedUser._doc) 
    return res.status(200).send(JSON.stringify(updatedUserWithoutPass))
    }catch(err){
      return res.status(500).send()
    }
  }
})
