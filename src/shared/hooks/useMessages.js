import { MessageContext } from "@/core/Providers/MessageProvider";
import { useContext } from "react";

export const useMessage = () => {
  const { messages, messageNotifications, sendMessage } =
    useContext(MessageContext);
  return { messages, messageNotifications, sendMessage };
};
