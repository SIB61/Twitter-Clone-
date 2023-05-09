import { getAllConversationsByUser } from "@/features/conversation/services/server/get-conversation.server";
import { handleRequest } from "@/shared/middlewares/request-handler";
import { getServerSession } from "next-auth";
import { createOptions } from "../auth/[...nextauth]";

export default handleRequest({
  async POST(req, res) {
    try {
      const { userId, receiverID } = req.body;
      const { pageIndex,pageSize } = req.query;
      const session = await getServerSession(req,res,createOptions(req))
      const messages = await getAllConversationsByUser({
        userId:session.user?.id,
        receiverID,
        pageIndex:+pageIndex,
        pageSize:+pageSize
      });
      return res.status(200).json({success:true,error:null,data:messages});
    } catch (err) {
      console.log(err);
      res.status(err.status||500).json({ success: false, error: err.error || "something went wrong", data: {} });
    }
  },
});
