import { handleRequest } from "@/lib/middlewares/request-handler";
import { getServerSession } from "next-auth";
import {
  createReply,
} from "@/features/tweet/services/server/create-tweet.server";
import { createOptions } from "../auth/[...nextauth]";
import { getReplies } from "@/features/tweet/services/server/get-tweet.server";
import { parseForm } from "@/utils/parse-form";
export const config = {
  api: {
    bodyParser: false,
  },
};
export default handleRequest({
  POST: async (req, res) => {
      const { fields, files } = await parseForm(req);
      const image = files.image
        ? "http://localhost:3000/uploads/" + files.image?.newFilename
        : null;
      const text = fields.text;
      const parent = fields.parent;
      const { user } = await getServerSession(req, res, createOptions(req));
      const reply = await createReply({ text, image, user, parent });
      return res.status(201).json({success:true,error:null,data:reply});
  },

  GET: async (req, res) => {
    const { pageIndex, pageSize, tweetId } = req.query;
    const { user } = await getServerSession(req, res, createOptions(req));
      const comments = await getReplies({
        pageSize,
        pageIndex,
        userId: user.id,
        parentId: tweetId,
      });
      return res.json(comments);
  },
});
