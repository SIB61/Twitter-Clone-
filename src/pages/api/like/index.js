import { handleRequest } from "@/shared/middlewares/request-handler";
import TweetModel from "@/core/schemas/tweet.schema";
import { getServerSession } from "next-auth";
import { createOptions } from "../auth/[...nextauth]";
export default handleRequest({
  async POST(req, res) {
    try {
      const { tweetId } = req.body;
      console.log(tweetId);
      const { user } = await getServerSession(req, res, createOptions(req));
      await TweetModel.updateOne(
        { _id: tweetId },
        { $push: { likes: user.id }, $inc: { totalLikes: 1 } }
      );
      return res.json({
        success: true,
        error: null,
        data: { message: "liked successfully" },
      });
    } catch (err) {
      return res
        .status(err.status || 500)
        .json({
          success: false,
          error: err.error || "something went wrong",
          data: {},
        });
    }
  },

  async DELETE(req, res) {
    try {
      const { tweetId } = req.query;
      const { user } = await getServerSession(req, res, createOptions(req));
      await TweetModel.updateOne(
        { _id: tweetId },
        { $pull: { likes: user.id }, $inc: { totalLikes: -1 } },
        { new: true }
      );
      return res.json({ success: true, error: null, data: {} });
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .json({
          success: false,
          error: err.error || "something went wrong",
          data: {},
        });
    }
  },
});
