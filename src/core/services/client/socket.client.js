import { getSocket } from "@/core/utils/getSocket";
export async function listenMessages(){
  const socket = await getSocket() 
  socket.on('connect',()=>{
    socket.join()
  })
}

