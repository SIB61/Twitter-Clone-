import { createRetweet } from "@/features/tweet/services/server/create-tweet.server";
import {
  deleteRetweet,
  deleteTweet,
} from "@/features/tweet/services/server/delete-tweet.server";
import { handleRequest } from "@/shared/middlewares/request-handler";
import { getServerSession } from "next-auth";
import { createOptions } from "../auth/[...nextauth]";

export default handleRequest({
  POST: async (req, res) => {
    const { tweetId } = req.body;
    const { user } = await getServerSession(req, res, createOptions(req));
    try {
      const retweet = await createRetweet({ user, tweetId });
      return res
        .status(201)
        .json({ success: true, error: null, data: retweet });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({
        success: false,
        error: err.error || "something went wrong",
        data: {},
      });
    }
  },

  DELETE: async (req, res) => {
    const { tweetId } = req.query;
    const { user } = await getServerSession(req, res, createOptions(req));
    try {
      await deleteRetweet({ tweetId, user });
      return res.json({ success: true, error: null, data: {} });
    } catch (err) {
      return res.status(err.status || 500).json({
        success: false,
        error: err.error || "something went wrong",
        data: {},
      });
    }
  },
});
