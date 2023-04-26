import { createContext, useContext, useEffect, useState } from "react";
import { getSocket } from "../utils/getSocket";

const SocketContext = createContext()
export function SocketProvider({children}){
  const [socket, setSocket] = useState(undefined);
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

  return <SocketContext.Provider value={socket}>
    {children}
  </SocketContext.Provider>
}

export function useSocket(){
  const socket = useContext(SocketContext)
  return socket
}
