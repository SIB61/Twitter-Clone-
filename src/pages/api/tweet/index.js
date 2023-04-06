import { createTweet } from "@/features/tweet/services/server/create-tweet";
import { handleRequest } from "@/shared/middlewares/request-handler";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { parseForm } from "@/shared/utils/parse-form";
export const config = {
  api:{
    bodyParser:false
  }
}
export default handleRequest({
  async POST(req, res) {
  try{
  const {fields,files} = await parseForm(req)
  const image = files.image? 'http://localhost:3000/uploads/' + files.image?.newFilename : undefined
  const content = fields.content
  const parent = fields.parent
  const type = fields.type
  console.log(image,content,type)
  const {user} = await getServerSession(req,res,authOptions)
  const tweet = await createTweet({content,parent,image,user,type})
  tweet.totalLikes = 0
  tweet.totalComments = 0
  return res.send(JSON.stringify(tweet))
  }catch(err){
  console.log(err)
  return res.status(500).send('error') 
  }
  },
});


