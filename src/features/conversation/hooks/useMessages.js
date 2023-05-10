import { useContext } from "react";
import { MessageContext } from "../providers/message-provider";
export const useMessages = () => {
  const { messages, messageNotifications ,dispatch} = useContext(MessageContext);
  return { messages, messageNotifications ,dispatch};
};
