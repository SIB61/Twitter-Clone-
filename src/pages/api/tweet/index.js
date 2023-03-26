import { handleRequest } from "@/shared/middlewares/request-handler";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { createTweet } from "@/features/tweet/services/server/create-tweet";

export default handleRequest({
  async POST(req, res) {
    const { post, image } = req.body;
    const {user} = await getServerSession(req, res, authOptions);
    console.log("tweet create session",user)
    try {
      const tweet = await createTweet({
        post,
        image,
        user
      });
      res.json(tweet);
    } catch (err) {
      res.status(err.status).send(err.error);
    }
  },
});
