import { handleRequest } from "@/shared/middlewares/request-handler";
import { getServerSession } from "next-auth";
import { parseForm } from "@/shared/utils/parse-form";
import {
  createReply,
  createTweet,
} from "@/features/tweet/services/server/create-tweet.server";
import { createOptions } from "../auth/[...nextauth]";
import { getReplies } from "@/features/tweet/services/server/get-tweet.server";
export const config = {
  api: {
    bodyParser: false,
  },
};
export default handleRequest({
  POST: async (req, res) => {
    try {
      const { fields, files } = await parseForm(req);
      const image = files.image
        ? "http://localhost:3000/uploads/" + files.image?.newFilename
        : undefined;
      const text = fields.text;
      const parent = fields.parent;
      const { user } = await getServerSession(req, res, createOptions(req));
      const tweet = await createReply({ text, image, user, parent });
      return res.send(JSON.stringify(tweet));
    } catch (err) {
      console.log(err);
      return res.status(500).send("error");
    }
  },

  GET: async (req, res) => {
    const { pageIndex, pageSize, tweetId } = req.query;
    const { user } = await getServerSession(req, res, createOptions(req));
    try {
      const comments = await getReplies({
        pageSize,
        pageIndex,
        userId: user.id,
        parentId: tweetId,
      });
      return res.json(comments);
    } catch (err) {
      return res.status(err.status).send(err.error);
    }
  },
});
