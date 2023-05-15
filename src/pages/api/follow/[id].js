import { handleRequest } from "@/lib/middlewares/request-handler";
import { getServerSession } from "next-auth";
import { createOptions } from "../auth/[...nextauth]";
import { follow } from "@/lib/services/user/follow.server";

export default handleRequest({
  POST: async (req, res) => {
      const { user: follower } = await getServerSession(
        req,
        res,
        createOptions(req)
      );
      const { id: followingId } = req.query;
      await follow({ followerId: follower.id, followingId: followingId });
      return res.json({ success: true, error: null, data: {} });
  },
});
