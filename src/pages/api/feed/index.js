import { handleRequest } from "@/lib/middlewares/request-handler";
import { getServerSession } from "next-auth";
import { createOptions } from "../auth/[...nextauth]";
import { getUserFeed } from "@/lib/services/tweet/get-tweet.server";

export default handleRequest({
  GET: async (req, res) => {
      const { pageIndex, pageSize } = req.query;
      const session = await getServerSession(req, res, createOptions(req));
      const feed = await getUserFeed({
        pageSize,
        pageIndex,
        userId: session.user.id,
      });
      return res.json({success:true,error:null,data:feed});
  },
});
