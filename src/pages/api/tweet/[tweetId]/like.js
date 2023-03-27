import { handleRequest } from "@/shared/middlewares/request-handler";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import LikeModel from "@/core/schemas/likes.schema";
import TweetModel from "@/core/schemas/tweet.schema";
export default handleRequest({
  async POST(req, res) {
    const { user } = await getServerSession(req, res, authOptions);
    const { tweetId } = req.query;
    const likeId = tweetId + user.id;
    let like = await LikeModel.findOneAndRemove({ likeId: likeId });
    if(like){
      await TweetModel.updateOne({_id:tweetId},{$inc:{totalLikes:-1}})
      return res.json(like)
    }
    like = await LikeModel.create({
        likeId,
        tweet:tweetId,
        user,
    });
    await TweetModel.updateOne({_id:tweetId},{$inc:{totalLikes:1}})
    return res.json(like)
  },
});
