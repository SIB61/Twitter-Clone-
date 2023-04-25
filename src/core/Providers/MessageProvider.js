import { useSession } from "next-auth/react"
import { createContext, useEffect } from "react"
import { getSocket } from "../utils/getSocket"
import socket from "@/pages/api/socket"
const MessageContext = createContext()

export function MessageProvider({children}){
 const {data:{user}} = useSession()
 useEffect(()=>{
   fetch('/api/socket')
   socket = getSocket()
   socket.on('connect',()=>{
     socket.emit('join',user.id)
   })
   socket.on('newMessage',()=>{})

 },[])
 return <MessageContext.Provider>
    {children}
  </MessageContext.Provider>
}
