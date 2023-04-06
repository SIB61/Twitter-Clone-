import { handleRequest } from "@/shared/middlewares/request-handler";
import { parseForm } from "@/shared/utils/parse-form";
import { updateTweet } from "@/features/tweet/services/server/update-tweet";
import { deleteTweet } from "@/features/tweet/services/server/delete-tweet.server";

export const config = {
  api:{
    bodyParser:false
  }
}
export default handleRequest({

  PATCH: async(req, res)=> {
  try{
  const {tweetId} = req.query
  const {fields,files} = await parseForm(req)
  const image = files.image? 'http://localhost:3000/uploads/' + files.image?.newFilename : fields.imageUrl
  const content = fields.content
  const newTweet = await updateTweet(tweetId,{content,image})
  return res.status(200).send(JSON.stringify(newTweet))
  }catch(err){
  console.log(err)
  return res.status(500).send('error') 
  }
  },

  DELETE: async(req,res)=> {
    try{
      const {tweetId} = req.query
      const tweet = await deleteTweet(tweetId)  
      return res.json(tweet)
    }catch(err){
      return res.status(err.status).send(err.message) 
    }
  }

});


