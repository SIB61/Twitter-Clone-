import { getAllConversationsByUser } from "@/features/conversation/services/server/get-conversation.server";
import { handleRequest } from "@/shared/middlewares/request-handler";

export default handleRequest({
  async POST(req, res) {
    try {
      const { userId, receiverID } = req.body;
      const { pageIndex } = req.query;
      const messages = await getAllConversationsByUser({
        userId,
        receiverID,
        pageIndex,
      });
      return res.status(200).json(messages);
    } catch (error) {
      console.log(error);
      return res.status(500).send("error");
    }
  },
});
