import { createContext, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useSocket } from "@/core/Providers/SocketProvider";
import { useActionDispatcher } from "@/shared/hooks/useAction";
import { MessageActions } from "../actions/message.action";
import { MESSAGE_SEEN, NEW_MESSAGE } from "@/constants";
export const MessageContext = createContext();
export function MessageProvider({ children }) {
  const {socket} = useSocket();
  const router = useRouter();
  const { room } = router.query;
  const { data: session } = useSession();
  const [state, dispatch] = useActionDispatcher({
    messages: {},
    messageNotifications: new Set(),
    socket: socket,
    user: session?.user,
    users:[],
    chatUsers:[]
  });
  const [newMessage, setNewMessage] = useState();
  const [messageSeen, setMessageSeen] = useState();

  useEffect(() => {
    if (messageSeen) {
      dispatch(MessageActions.MESSAGE_SEEN, messageSeen.userId);
    }
  }, [messageSeen]);

  useEffect(() => {
    if (newMessage) {
      dispatch(MessageActions.ADD_MESSAGE, newMessage);
    }
  }, [newMessage]);

  useEffect(() => {
    if (session) {
      dispatch(MessageActions.SET_USER, session.user);
      dispatch(MessageActions.FETCH_MESSAGE_NOTIFICATION, session.user);
    }
  }, [session]);

  useEffect(() => {
    if (room) {
      dispatch(MessageActions.CLEAR_USER_NOTIFICATION, room);
      dispatch(MessageActions.SET_ROOM, room);
    }
  }, [room]);

  useEffect(() => {
    if (socket) {
      dispatch(MessageActions.SET_SOCKET, socket)
        .then(() => {
        socket.on(NEW_MESSAGE, setNewMessage);
        socket.on(MESSAGE_SEEN, setMessageSeen);
      });
    }
  }, [socket]);

  return (
    <MessageContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MessageContext.Provider>
  );
}
