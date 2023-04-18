import { Redis } from "ioredis";
import { Server } from "socket.io";
let redis
export async function createSocketConnection(userId,res) {
  let io = res.socket.server.io;
  if(!redis) redis = new Redis(process.env.REDIS_URL)
  if (!io) {
    const io = new Server(res.socket.server);
    io.on("connection", async(socket) => {
      console.log("connected")
      await redis.set(userId,socket.id)
      socket.on("sendMessage", async (msg) => {
        const newMessage = JSON.parse(msg)
        console.log("sendMessage")
        console.log(msg)
        const receiverSocketId = await redis.get(newMessage.receiverId)
        if(receiverSocketId) {
          socket.to(receiverSocketId).emit("newMessage",msg)
        }
      });
    });
  }
  return io
}
