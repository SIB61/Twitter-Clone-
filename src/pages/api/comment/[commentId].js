import TweetModel from "@/core/schemas/tweet.schema";
import { handleRequest } from "@/shared/middlewares/request-handler";
import { mapId } from "@/shared/utils/mapId";

export default handleRequest({
  PATCH:async (req,res)=>{
    try{
     const {commentId} = req.query
     const {text} = req.body
     const newComment = await TweetModel.findOneAndUpdate({_id:commentId},{"content.text":text},{new:true}) 
      console.log(newComment)
     return res.json(mapId(newComment._doc)) 
    }catch(err){
      return res.status(err.status).send(err.error)
    }
  },


  DELETE:async (req,res)=>{
    try{
      const {commentId} = req.query
      const comment = await TweetModel.findOneAndRemove({_id:commentId})
      await TweetModel.updateOne({_id:comment.origin},{$inc:{totalComments:-1}})
      await TweetModel.deleteMany({immediateOrigin:commentId})
      return res.json(mapId(comment._doc))
    } catch(err){
      return res.status(err.status).send(err.error)
    }
  }
})
