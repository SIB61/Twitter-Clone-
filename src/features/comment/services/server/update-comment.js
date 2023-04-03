import CommentModel from "@/core/schemas/comments.schema";
import { mapId } from "@/shared/utils/mapId";

export async function  updateComment(id,comment){
  try{
    
   const newComment = await CommentModel.findOneAndUpdate({_id:id},{...comment},{new:true})
   return mapId(newComment._doc)
  } catch(err){
    throw {status:500,error:err.message}
  }
}
