import { handleRequest } from "@/shared/middlewares/request-handler";
import { getServerSession } from "next-auth";
import { parseForm } from "@/shared/utils/parse-form";
import { createComment } from "@/features/tweet/services/server/create-tweet.server";
import { createOptions } from "../auth/[...nextauth]";
export const config = {
  api: {
    bodyParser: false,
  },
};
export default handleRequest({
  async POST(req, res) {
    try {
      const { fields } = await parseForm(req);
      const text = fields.text;
      const origin = fields.origin
      const { user } = await getServerSession(req, res, createOptions(req));
      const tweet = await createComment({ text , user, origin });
      return res.send(JSON.stringify(tweet));
    } catch (err) {
      console.log(err);
      return res.status(500).send("error");
    }
  },
});
