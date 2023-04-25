import { handleRequest } from "@/shared/middlewares/request-handler";
import { getServerSession } from "next-auth";
import { Server } from "socket.io";
import { createOptions } from "./auth/[...nextauth]";
import { createMessage } from "@/features/conversation/services/server/create-message.server";
import { mapId } from "@/shared/utils/mapId";

export default handleRequest({
  GET: async (req, res) => {
    const { user } = await getServerSession(req, res, createOptions(req));
    await createSocketConnection(user.id, res);
    res.end();
  },
});

async function createSocketConnection(userId, res) {
  let io = res.socket.server.io;
  console.log("userId", userId);
  if (!io) {
    const io = new Server(res.socket.server);
    io.on("connection", async (socket) => {
      socket.on("sendMessage", async ({ content, sender, receiver }) => {
        const room = receiver;
        console.log(room);
        const newMessage = await createMessage({
          sender: sender,
          receiver: receiver,
          text: content.text,
        });
        console.log("new message",newMessage)
        socket.to(room).emit("newMessage", mapId(newMessage._doc));
      });

      socket.on("join", (room) => {
        console.log("room is ", room);
        console.log(socket.rooms)
        if (!socket.rooms.has(room)) {
          socket.join(room);
        }
      });

      socket.on("leave", (room) => {
        console.log("room is ", room);
        socket.leave(room);
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
