import { MessageContext } from "@/utils/contexts";
import { useContext } from "react";
export const useMessages = () => {
  const { messages, messageNotifications, chatUsers, dispatch } =
    useContext(MessageContext);
  return { messages, messageNotifications, chatUsers, dispatch };
};
