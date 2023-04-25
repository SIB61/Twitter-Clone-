import { MessageContext } from "@/core/Providers/MessageProvider";
import { useContext } from "react";

export const useMessage = () => {
  const { messages, unseenMessageCount, sendMessage } =
    useContext(MessageContext);
  return { messages, unseenMessageCount, sendMessage };
};
