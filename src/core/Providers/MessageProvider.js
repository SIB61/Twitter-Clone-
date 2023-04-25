import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import { getSocket } from "../utils/getSocket";
import { useCustomState } from "@/shared/hooks/useCustomState";
export const MessageContext = createContext();
export function MessageProvider({ children }) {
  const messages = useCustomState({});
  const [socket, setSocket] = useState(undefined);
  const { data: session } = useSession();
  const unseenMessageCount = useCustomState({});
  const newMessages = useCustomState({});
  useEffect(() => {
    const socketInitializer = async () => {
      if (!socket) {
        const socketClient = await getSocket();
        setSocket(socketClient);
      }

      socket?.on("newMessage", (message) => {
        if (!newMessages.value[message.id]) {
          newMessages.value[message.id] = message;

          messages.set((curr) => {
            if (curr[message.sender]) {
              curr[message.sender].unshift(message);
            } else {
              curr[message.sender] = [message];
            }
            return { ...curr };
          });
          unseenMessageCount.set((curr) => {
            if (curr[message.sender]) {
              curr[message.sender]++;
            } else {
              curr[message.sender] = 1;
            }
            return curr;
          });

        }
      });
    };
    socketInitializer();
    return () => socket?.removeAllListeners();
  }, [socket]);

  useEffect(() => {
    if (session && session.user) socket?.emit("join", session.user.id);
  }, [session, socket]);

  const sendMessage = (message) => {
    socket.emit("sendMessage", message);
    messages.set((curr) => {
      return {
        ...curr,
        [message.receiver]: [message, ...curr[message.receiver]],
      };
    });
  };

  return (
    <MessageContext.Provider
      value={{ messages, unseenMessageCount, sendMessage }}
    >
      {children}
    </MessageContext.Provider>
  );
}
