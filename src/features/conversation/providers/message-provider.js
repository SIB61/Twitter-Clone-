import { createContext, useCallback, useEffect, useRef } from "react";
import { useCustomState } from "@/shared/hooks/useCustomState";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useSocket } from "@/core/Providers/SocketProvider";
import { MESSAGE_SEEN, NEW_MESSAGE, SEND_MESSAGE, SEND_NOTIFICATION } from "@/constants";
export const MessageContext = createContext();
export function MessageProvider({ children }) {
  const messages = useCustomState({});
  const socket = useSocket();
  const messageNotifications = useCustomState(new Set());
  const router = useRouter();
  const { room } = router.query;
  const newMessage = useCustomState();
  const { data: session } = useSession();

  useEffect(() => {
    const setNotifications = async () => {
      const { data: notifications } = await axios.get(
        "/api/notification?type=message"
      );
      messageNotifications.set(new Set(notifications));
    };
    setNotifications();
  }, []);

  const addNewMessage = (message) => {
      const otherSide =
          message.sender !== session?.user.id
          ? message.sender
          : message.receiver;
      let otherSideMessages = messages.value[otherSide];
      if (!otherSideMessages) {
        otherSideMessages = [];
      }
      if(message.receiver === session?.user.id){
        message.seen = true
      }
      otherSideMessages.unshift(message);
      messages.set((curr) => {
        curr[otherSide] = otherSideMessages;
        return { ...curr };
      });
  };

  const addNewMessageNotification = (message) => {
    if (room && room != message.sender && message.sender!== session?.user.id) {
      socket?.emit(SEND_NOTIFICATION, {
        ...message,
        receiver: session?.user.id,
      });
      // const audio = new Audio("/sounds/message.mp3");
      // audio.play();
      messageNotifications.set((value) => {
        value.add(message.sender);
        return new Set(value);
      });
    }
  };

  useEffect(()=>{
    if(newMessage.value){
      addNewMessage(newMessage.value)
      addNewMessageNotification(newMessage.value)
    }
  },[newMessage.value])

  useEffect(() => {
    if (room) {
      messageNotifications.set((value) => {
        value.delete(room);
        return value;
      });
    }
  }, [room]);

  useEffect(() => {
    socket?.on(NEW_MESSAGE, (message) => {
      newMessage.set(message)
    });
    socket?.on(MESSAGE_SEEN,(receiver)=>{
      const otherMessages = messages.value[receiver]
      if(otherMessages && otherMessages.length > 0){
      for(let i=0;i<otherMessages.length;i++){
        if(otherMessages[i].seen){
            break;
        }
        otherMessages[i].seen = true
      }
      }
      messages.set(curr=>{
        const newMessages = {...curr,[receiver]:otherMessages}
        console.log(newMessages)
        return newMessages
      })
    })
  }, [socket]);

  const sendMessage = (message) => {
    socket?.emit(SEND_MESSAGE, message);
  };

  return (
    <MessageContext.Provider
      value={{ messages, messageNotifications, sendMessage, newMessage }}
    >
      {children}
    </MessageContext.Provider>
  );
}
