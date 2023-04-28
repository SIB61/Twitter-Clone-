import { createContext, useCallback, useEffect, useRef } from "react";
import { useCustomState } from "@/shared/hooks/useCustomState";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useSocket } from "@/core/Providers/SocketProvider";
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
      console.log(notifications);
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
      socket?.emit("sendNotification", {
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
    socket?.on("newMessage", (message) => {
      newMessage.set(message)
    });
    socket?.on('seen',(message)=>{
      console.log("seen called",message)
      const otherMessages = messages.value[message.receiver]
      // console.log(otherMessages)
      for(let i = otherMessages.length-1;i>=0;i--){
        if(otherMessages[i].id && otherMessages[i].id.toString() === message.id.toString()){
           console.log(otherMessages[i])
           otherMessages[i].seen = true
           break;
        }
      }
      messages.set(curr=>{
        const newMessages = {...curr,[message.receiver]:otherMessages}
        console.log(newMessages)
        return newMessages
      })
    })
  }, [socket]);

  const sendMessage = (message) => {
    socket?.emit("sendMessage", message);
  };

  return (
    <MessageContext.Provider
      value={{ messages, messageNotifications, sendMessage, newMessage }}
    >
      {children}
    </MessageContext.Provider>
  );
}
