import { createMessage } from "@/features/conversation/services/server/create-message.server";
import { createMessageNotification } from "@/features/notification/services/server/create-message-notification.server";
import { handleRequest } from "@/shared/middlewares/request-handler";
import { createSocketConnection } from "../socket";
import { NEW_MESSAGE } from "@/constants";

export default handleRequest({
  POST: async (req, res) => {
    try {
      const { content, sender, receiver, customId } = req.body;
      const newMessage = await createMessage({
        sender: sender,
        receiver: receiver,
        text: content.text,
      });

      createMessageNotification({
        userId: receiver,
        notificationSenderId: sender,
      });

      await createSocketConnection(res);

      let io = res.socket.server.io;

      io?.in(receiver).emit(NEW_MESSAGE, newMessage);

      return res.json({
        success: true,
        error: null,
        data: { message: newMessage, customId },
      });
    } catch (err) {
      return res.status(err.status || 500).json({
        success: false,
        error: err.error || "something went wrong",
        data: {},
      });
    }
  },
});
