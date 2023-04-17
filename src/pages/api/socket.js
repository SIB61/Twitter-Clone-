import { handleRequest } from "@/shared/middlewares/request-handler";
import { getServerSession } from "next-auth";
import { Server } from "socket.io";
import { createOptions } from "./auth/[...nextauth]";
import Redis from 'ioredis'

let redis

export default handleRequest({
  GET:async(req,res)=>{
    const user = await getServerSession(req,res,createOptions(req))
    await createSocketConnection(user.id,res)
    res.end()
  }
})

async function createSocketConnection(userId,res) {
  let io = res.socket.server.io;
  if(!redis) redis = new Redis(process.env.REDIS_URL)
  if (!io) {
    const io = new Server(res.socket.server);
    io.on("connection", async(socket) => {
      await redis.set(userId,socket.id)
      socket.on("sendMessage", async (msg) => {
        const newMessage = JSON.parse(msg)
        const receiverSocketId = await redis.get(newMessage.receiverId)
        if(receiverSocketId) {
          socket.to(receiverSocketId).emit("newMessage",msg)
        }
      });
      socket.on('join',(room)=>{
        socket.join(room)
      })
    });
    res.socket.server.io = io;
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
