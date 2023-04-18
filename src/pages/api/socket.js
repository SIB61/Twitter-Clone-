import { handleRequest } from "@/shared/middlewares/request-handler";
import { getServerSession } from "next-auth";
import { Server } from "socket.io";
import { createOptions } from "./auth/[...nextauth]";
import { createMessage } from "@/features/conversation/services/server/create-message.server";

export default handleRequest({
  GET: async (req, res) => {
    const { user } = await getServerSession(req, res, createOptions(req));
    console.log(user);
    await createSocketConnection(user.id, res);
    res.end();
  },
});

async function createSocketConnection(userId, res) {
  let io = res.socket.server.io;
  console.log("userId", userId);
  if (!io) {
    const io = new Server(res.socket.server);
    io.on("connection", async(socket) => {
      socket.on("sendMessage", async ({ content, sender, receiver}) => {
        const room = receiver + "-" + sender;
        await createMessage({sender:sender,receiver:receiver,text:content.text}) 
        socket.broadcast
          .to(room)
          .emit("newMessage", { content, sender, receiver });
      });
      socket.on("join", (room) => {
        socket.join(room);
        console.log("joining", room);
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
