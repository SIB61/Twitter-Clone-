import { createContext, useEffect } from "react";
import { useCustomState } from "@/shared/hooks/useCustomState";
import { useRouter } from "next/router";
import { useSocket } from "./SocketProvider";
import { useSession } from "next-auth/react";
import axios from "axios";
export const MessageContext = createContext();
const newMessages = {};
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
      console.log(notifications)
      messageNotifications.set(new Set(notifications));
    };
    setNotifications();
  }, []);

  useEffect(() => {
    if (
      newMessage.value &&
      room &&
      room != newMessage.value?.sender &&
      newMessage.value?.sender !== session?.user.id
    ) {
      socket?.emit("sendNotification", {
        ...newMessage.value,
        receiver: session?.user.id,
      });

      messageNotifications.set((value) => {
        value.add(newMessage.value?.sender);
        return new Set(value);
      });
    }

    if (newMessage.value) {
      messages.set((curr) => {
        if (newMessage.value.id && newMessages[newMessage.value.id]) {
          return curr;
        }
        const otherSide =
          newMessage.value.sender !== session?.user.id
            ? newMessage.value.sender
            : newMessage.value.receiver;
        if (!curr[otherSide]) {
          curr[otherSide] = [];
        }
        curr[otherSide].unshift(newMessage.value);
        newMessages[newMessage.value.id] = newMessage.value;
        return { ...curr };
      });
    }
  }, [newMessage.value]);

  useEffect(() => {
    if (room) {
      messageNotifications.set((value) => {
        value.delete(room);
        return value;
      });
    }
  }, [room]);

  useEffect(() => {
    socket?.on("newMessage", async (message) => {
      newMessage.set(message);
    });
  }, [socket]);

  const sendMessage = (message) => {
    socket?.emit("sendMessage", message);
    messages.set((value) => {
      if (!value[message.receiver]) {
        value[message.receiver] = [];
      }
      value[message.receiver].unshift(message);
      return { ...value };
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
