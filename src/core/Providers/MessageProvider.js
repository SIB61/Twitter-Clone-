import { useSession } from "next-auth/react";
import { createContext, useEffect } from "react";
import { useCustomState } from "@/shared/hooks/useCustomState";
import { useRouter } from "next/router";
import { useSocket } from "./SocketProvider";
export const MessageContext = createContext();
const newMessages = {};
export function MessageProvider({ children }) {
  const messages = useCustomState({});
  const socket = useSocket()
  const { data: session } = useSession();
  const messageNotifications = useCustomState(new Set());
  const router = useRouter();
  const {room} = router.query
  const addMessageNotification=(sender)=>{
      messageNotifications.set((value) => {
          if ( room !== sender) {
            value.add(sender);
          }
          return value;
        });
  }
  useEffect(() => {
      socket?.on("newMessage", (message) => {
        addMessageNotification(message.sender)
        messages.set((curr) => {
          if (!newMessages[message.id]) {
            if (curr[message.sender]) {
              curr[message.sender].unshift(message);
            } else {
              curr[message.sender] = [message];
            }
            newMessages[message.id] = message;
          }
          return { ...curr };
        });
      });
  }, [socket]);


  const sendMessage = (message) => {
    socket?.emit("sendMessage", message);
    messages.set((curr) => {
      return {
        ...curr,
        [message.receiver]: [message, ...curr[message.receiver]],
      };
    });
  };

  return (
    <MessageContext.Provider
      value={{ messages, messageNotifications, sendMessage }}
    >
      {children}
    </MessageContext.Provider>
  );
}
