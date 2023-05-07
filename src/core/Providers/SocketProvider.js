import { createContext, useContext, useEffect, useState } from "react";
import { getSocket } from "../utils/getSocket";
import { useSession } from "next-auth/react";
import { JOIN } from "@/constants";

const SocketContext = createContext()
export function SocketProvider({children}){
  const [socket, setSocket] = useState(undefined);
  const {data:session} = useSession()
  useEffect(() => {
    const socketInitializer = async () => {
      if (!socket) {
        const socketClient = await getSocket();
        setSocket(socketClient);
      }
    };
    if(session){
     socketInitializer();
    }
    return () => socket?.removeAllListeners();
  }, [socket,session]);

  useEffect(() => {
    if (session && session.user) socket?.emit(JOIN, session.user.id);
  }, [session, socket]);

  return <SocketContext.Provider value={socket}>
    {children}
  </SocketContext.Provider>
}

export function useSocket(){
  const socket = useContext(SocketContext)
  return socket
}
