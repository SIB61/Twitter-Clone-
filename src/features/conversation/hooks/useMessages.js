import { useContext } from "react";
import { MessageContext } from "../providers/message-provider";
export const useMessages = () => {
  const { messages, messageNotifications, sendMessage ,newMessage} =
  useContext(MessageContext);
  return { messages, messageNotifications, sendMessage ,newMessage};
};
