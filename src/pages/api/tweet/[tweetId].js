import { handleRequest } from "@/lib/middlewares/request-handler";
import { getServerSession } from "next-auth";
import { createOptions } from "../auth/[...nextauth]";
import { parseForm } from "@/utils/parse-form";
import { updateTweet } from "@/lib/services/tweet/update-tweet.server";
import { deleteTweet } from "@/lib/services/tweet/delete-tweet.server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handleRequest({
  PATCH: async (req, res) => {
    const { tweetId } = req.query;
    const { fields, files } = await parseForm(req);
    const image = files.image
      ? "http://localhost:3000/uploads/" + files.image?.newFilename
      : fields.imageUrl;
    const text = fields.content;
    const { user } = await getServerSession(req, res, createOptions(req));
    const newTweet = await updateTweet({
      tweetId,
      text,
      image,
      userId: user.id,
    });
    return res.status(200).json({ success: true, error: null, data: newTweet });
  },

  DELETE: async (req, res) => {
    const { tweetId } = req.query;
    const { user } = await getServerSession(req, res, createOptions(req));
    await deleteTweet({ tweetId, userId: user.id });
    return res.json({ success: true, error: null, data: {} });
  },
});
