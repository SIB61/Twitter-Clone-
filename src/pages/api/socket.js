import { handleRequest } from "@/shared/middlewares/request-handler";
import { getServerSession } from "next-auth";
import { Server } from "socket.io";
import { createOptions } from "./auth/[...nextauth]";
import { createMessage } from "@/features/conversation/services/server/create-message.server";
import { mapId } from "@/shared/utils/mapId";
import { seeMessage } from "@/features/conversation/services/server/seeMessage.server";
import { createNotification } from "@/features/notification/services/server/create-notification";
import UserModel from "@/core/schemas/user.schema";
import { createMessageNotification } from "@/features/notification/services/server/create-message-notification.server";
import { CONNECTION, JOIN, LEAVE, MESSAGE_SEEN, NEW_MESSAGE, SEE_MESSAGE, SEND_MESSAGE, SEND_NOTIFICATION } from "@/constants";
import mongoose from "mongoose";

export default handleRequest({
  GET: async (req, res) => {
    const session = await getServerSession(req, res, createOptions(req));
    if (session) {
      await createSocketConnection(session.user?.id, res);
    }
    res.end();
  },
});

async function createSocketConnection(userId, res) {
  let io = res.socket.server.io;
  if (!io) {
    const io = new Server(res.socket.server);
    io.on(CONNECTION, async (socket) => {
      socket.on(SEND_MESSAGE, async ({ content, sender, receiver }) => {
        const newMessage = await createMessage({
          sender: sender,
          receiver: receiver,
          text: content.text,
        });
        io.to(socket.id).emit(NEW_MESSAGE, newMessage);
        socket.to(receiver).emit(NEW_MESSAGE, newMessage);
      });

      socket.on(JOIN, (room) => {
        console.log("room is ", room);
        if (!socket.rooms.has(room)) {
          socket.join(room);
        }
      });

      socket.on(SEND_NOTIFICATION, async (notification) => {
        createMessageNotification({
          userId: notification.receiver,
          notificationSenderId: notification.sender,
        });
      });

      socket.on(LEAVE, (room) => {
        console.log("room is ", room);
        socket.leave(room);
      });

      socket.on(SEE_MESSAGE, async (message) => {
        console.log("socket seen", message.id);
        seeMessage({ messageIds: [new mongoose.Types.ObjectId(message.id)] });
        socket.to(message.sender).emit(MESSAGE_SEEN, {userId:message.receiver});
      });
    });
    res.socket.server.io = io;
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
