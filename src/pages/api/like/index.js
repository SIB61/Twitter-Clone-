import { handleRequest } from "@/shared/middlewares/request-handler";
import TweetModel from "@/core/schemas/tweet.schema";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
export default handleRequest({
  async POST(req, res) {
    const { tweetId } = req.body;
    const {user} = await getServerSession(req,res,authOptions)
    await TweetModel.updateOne({_id:tweetId},{$push:{likes:user.id}})
    return res.json({message:"liked successfully"})
  },
});
