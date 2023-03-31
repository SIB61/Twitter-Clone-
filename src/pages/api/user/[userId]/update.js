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
    const cover = files.cover? 'http://localhost:3000/uploads/' + files.cover?.newFilename : undefined
    let updatedUser = await UserModel.findOneAndUpdate({_id:userId},{
      ...fields,
      image:image,
      cover:cover
    })
    updatedUser = mapId(updatedUser._doc) 
    const { passwordHash,...updatedUserWithoutPass } = updatedUser
    return res.status(200).send(JSON.stringify(updatedUserWithoutPass))
    }catch(err){
      console.log(err)
      return res.status(500).send()
    }
  }
})
