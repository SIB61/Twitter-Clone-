import { createRetweet } from "@/features/tweet/services/server/create-tweet.server";
import { deleteTweet } from "@/features/tweet/services/server/delete-tweet.server";
import { updateTweet } from "@/features/tweet/services/server/update-tweet.server";
import { handleRequest } from "@/shared/middlewares/request-handler";
import { parseForm } from "@/shared/utils/parse-form";
import { getServerSession } from "next-auth";
import { createOptions } from "../auth/[...nextauth]";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handleRequest({

  PATCH: async (req, res) => {
    try {
      const { tweetId } = req.query;
      const { fields, files } = await parseForm(req);
      const image = files.image
        ? "http://localhost:3000/uploads/" + files.image?.newFilename
        : fields.imageUrl;
      const text = fields.content;
      const {user} = await getServerSession(req,res,createOptions(req))
      const newTweet = await updateTweet({ tweetId, text, image ,userId:user.id});
      return res.status(200).send(JSON.stringify(newTweet));
    } catch (err) {
      console.log(err);
      return res.status(500).send("error");
    }
  },

  DELETE: async (req, res) => {
    try {
      const { tweetId } = req.query;
      const {user} = await getServerSession(req,res,createOptions(req))
      const tweet = await deleteTweet({tweetId,userId:user.id});
      return res.json(tweet);
    } catch (err) {
      return res.status(err.status).send(err.error);
    }
  },
});
