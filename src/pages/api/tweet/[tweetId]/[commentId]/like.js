import { handleRequest } from "@/shared/middlewares/request-handler";
import { getServerSession } from "next-auth";
import LikeModel from "@/core/schemas/likes.schema";
import TweetModel from "@/core/schemas/tweet.schema";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import CommentModel from "@/core/schemas/comments.schema";
export default handleRequest({
  async POST(req, res) {
    const { user } = await getServerSession(req, res, authOptions);
    const { commentId } = req.query;
    const likeId = commentId + user.id;
    let like = await LikeModel.findOneAndRemove({ likeId: likeId });
    if(like){
      await CommentModel.updateOne({_id:commentId},{$inc:{totalLikes:-1}})
      return res.json(like)
    }
    like = await LikeModel.create({
        likeId,
        post:commentId,
        user,
    });
    await CommentModel.updateOne({_id:commentId},{$inc:{totalLikes:1}})
    return res.json(like)
  },
});
