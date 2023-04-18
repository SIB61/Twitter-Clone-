import { handleRequest } from "@/shared/middlewares/request-handler";
import { getServerSession } from "next-auth";
import { Server } from "socket.io";
import { createOptions } from "./auth/[...nextauth]";
import Redis from 'ioredis'

let redis

export default handleRequest({
  GET:async(req,res)=>{
    const {user} = await getServerSession(req,res,createOptions(req))
    console.log(user)
    await createSocketConnection(user.id,res)
    res.end()
  }
})

async function createSocketConnection(userId,res) {
  let io = res.socket.server.io;
  console.log("userId",userId)
  if(!redis) redis = new Redis(process.env.REDIS_URL)
  if (!io) {
    const io = new Server(res.socket.server);
    io.on("connection", async(socket) => {
      console.log('connection',userId,socket.id)
      await redis.set(userId,socket.id)
      socket.on("sendMessage", async (msg) => {
        const newMessage = JSON.parse(msg)
        console.log(msg)
        const receiverSocketId = await redis.get(newMessage.receiverId)
        console.log(receiverSocketId)
        if(receiverSocketId) {
          console.log('receiver socket id',receiverSocketId)
          // socket.broadcast.to(receiverSocketId).emit("newMessage",msg)
          socket.broadcast.emit("newMessage",msg)
        }
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
