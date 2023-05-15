import { handleRequest } from "@/lib/middlewares/request-handler";
import { getServerSession } from "next-auth";
import { createOptions } from "../auth/[...nextauth]";
import { createRetweet } from "@/lib/services/tweet/create-tweet.server";
export default handleRequest({
  POST: async (req, res) => {
    const { tweetId } = req.body;
    const { user } = await getServerSession(req, res, createOptions(req));
    const retweet = await createRetweet({ user, tweetId });
    return res.status(201).json({ success: true, error: null, data: retweet });
  },

  DELETE: async (req, res) => {
    const { tweetId } = req.query;
    const { user } = await getServerSession(req, res, createOptions(req));
    await deleteRetweet({ tweetId, user });
    return res.json({ success: true, error: null, data: {} });
  },
});
