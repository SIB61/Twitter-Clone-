import { createContext, useContext, useEffect, useState } from "react";
import { getSocket } from "../utils/getSocket";
import { useSession } from "next-auth/react";

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
    socketInitializer();
    return () => socket?.removeAllListeners();
  }, [socket]);

  useEffect(() => {
    if (session && session.user) socket?.emit("join", session.user.id);
  }, [session, socket]);

  return <SocketContext.Provider value={socket}>
    {children}
  </SocketContext.Provider>
}

export function useSocket(){
  const socket = useContext(SocketContext)
  return socket
}
