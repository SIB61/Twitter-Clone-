import { createRetweet } from "@/features/tweet/services/server/create-tweet.server";
import { deleteRetweet, deleteTweet } from "@/features/tweet/services/server/delete-tweet.server";
import { handleRequest } from "@/shared/middlewares/request-handler";
import { getServerSession } from "next-auth";
import { createOptions } from "../auth/[...nextauth]";

export default handleRequest({
  POST: async (req, res) => {
    const { tweetId } = req.body;
    const {user} = await getServerSession(req, res, createOptions(req));
    try {
      const retweet = await createRetweet({ user, tweetId });
      return res.json(retweet);
    } catch (err) {
      console.log(err)
      return res.status(err.status).send(err.error);
    }
  },

  DELETE:async (req,res) => {
    const { tweetId } = req.query;
    const {user} = await getServerSession(req,res,createOptions(req)) 
    try {
      const retweet = await deleteRetweet({tweetId,user}) 
      return res.json(retweet);
    } catch (err) {
      return res.status(err.status).send(err.error);
    }
  }
})

