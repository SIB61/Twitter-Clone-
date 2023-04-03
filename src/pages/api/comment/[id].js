import CommentModel from "@/core/schemas/comments.schema";
import TweetModel from "@/core/schemas/tweet.schema";
import { updateComment } from "@/features/comment/services/server/update-comment";
import { handleRequest } from "@/shared/middlewares/request-handler";

export default handleRequest({
  PATCH:async (req,res)=>{
    try{
     const {id} = req.query
     const comment = req.body
      console.log(comment)
     const newComment = await updateComment(id,comment)
      console.log(newComment)
     return res.json(newComment) 
    }catch(err){
      return res.status(err.status).send(err.error)
    }
  },


  DELETE:async (req,res)=>{
    try{

      const {id} = req.query
      const comment = await CommentModel.findOneAndRemove({_id:id})
      await TweetModel.updateOne({_id:comment.tweet},{$inc:{totalComments:-1}})
      if(comment.comment)
      await CommentModel.updateOne({_id:comment.comment},{$inc:{totalComments:-1}})
      return res.json(comment)

    } catch(err){
      return res.status(err.status).send(err.error)
    }
  }
})
