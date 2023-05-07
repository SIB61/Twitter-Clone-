import { NEW_MESSAGE } from "@/constants";
import { getSocket } from "@/core/utils/getSocket";
import axios from "axios";

export const MessageActions = {

  ADD_MESSAGE: (state, message) => {
    const room =
      state.user && state.user.id === message.receiver
        ? message.sender
        : message.receiver;
    if (!state.message[room]) state.messages[room] = [];
    {
      state.messages[room].unshift(message);
    }
    return { ...state };
  },

  SEND_MESSAGE: async (state, payload) => {
    const socket = await getSocket();
    socket.emit(NEW_MESSAGE, payload);
    return state;
  },

  MESSAGE_SEEN: async (state, userId) => {
    const messages = state.messages[userId];
    if (messages && messages.length > 0) {
      for (let i = 0; i < messages.length; i++) {
        if (messages[i].seen) {
          break;
        }
        messages[i].seen = true;
      }
    }
    return { ...state };
  },

  FETCH_MESSAGE_NOTIFICATION: async (state) => {
    let { data: notifications } = await axios.get(
      "/api/notification?type=message"
    );
    notifications = new Set(notifications);
    state.messageNotifications = notifications;
    return { ...state };
  },

};
