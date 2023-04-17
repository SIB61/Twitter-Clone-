import { handleRequest } from "@/shared/middlewares/request-handler";
import { getServerSession } from "next-auth";
import { parseForm } from "@/shared/utils/parse-form";
import { createTweet } from "@/features/tweet/services/server/create-tweet.server";
import { createOptions } from "../auth/[...nextauth]";
import { getUserFeed } from "@/features/tweet/services/server/get-tweet.server";
export const config = {
  api: {
    bodyParser: false,
  },
};
export default handleRequest({
  async POST(req, res) {
    try {
      const { fields, files } = await parseForm(req);
      const image = files.image
        ? "http://localhost:3000/uploads/" + files.image?.newFilename
        : undefined;
      const text = fields.text;
      const { user } = await getServerSession(req, res, createOptions(req));
      const tweet = await createTweet({ text, image, user });
      return res.status(201).json(tweet);
    } catch (err) {
      console.log(err);
      return res.status(500).send("error");
    }
  },

  GET:async (req,res)=>{
    const {pageIndex,pageSize} = req.query
    const {user} = await getServerSession(req,res,createOptions(req))
    try{
       const feed = await getUserFeed({pageSize,pageIndex,userId:user.id})
       return res.json(feed)
    }catch(err){
       return res.status(err.status).send(err.error)
    }
  }

});
