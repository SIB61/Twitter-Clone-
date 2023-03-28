import { createTweet } from "@/features/tweet/services/server/create-tweet";
import { handleRequest } from "@/shared/middlewares/request-handler";
import { parseForm } from "@/shared/utils/parse-form";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export const config = {
  api:{
    bodyParser:false
  }
}

export default handleRequest({
  async POST(req, res) {
  try{
  const {fields,files} = await parseForm(req)
  const image = files.image? '/uploads/' + files.image?.newFilename : undefined
  const content = fields.content
  console.log(image,content)
  const {user} = await getServerSession(req,res,authOptions)
  const tweet = await createTweet({content,image,user})
  return res.json(tweet)
  }catch(err){
  console.log(err)
  return res.status(500).send('error') 
  }
  
  },



});


