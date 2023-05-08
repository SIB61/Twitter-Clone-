import { SEE_MESSAGE, SEND_MESSAGE, SEND_NOTIFICATION } from "@/constants";
import axios from "axios";

export const MessageActions = {
  SET_SOCKET: (state, socket) => {
    state.socket = socket;
    return { ...state };
  },

  SET_USER: (state, user) => {
    state.user = user;
    return { ...state };
  },

  SET_ROOM: (state, room) => {
    state.room = room;
    return { ...state };
  },

  ADD_MESSAGE: (state, message) => {
    let room;

    if (state.user && state.user.id === message.sender) {
      room = message.receiver;
    } else {
      room = message.sender;
      message.seen = true;
    }

    if (state.room === room) {
      state.socket?.emit(SEE_MESSAGE, message);
    }else {
      state.socket?.emit(SEND_NOTIFICATION,message)
      state.messageNotifications.unshift(room)
    }

    if (!state.messages[room]) {
      state.messages[room] = { data: [], isLastPage: false, pageIndex: 1 };
    }
    state.messages[room].data.unshift(message);
    return { ...state };
  },

  FETCH_USER_MESSAGES: async (state, { userId, pageSize = 50 }, dispatch) => {
    try {
      const { data: newPage } = await axios.post(
        `/api/conversation/?pageIndex=${
          state.messages[userId].pageIndex + 1
        }&pageSize=${pageSize}`,
        {
          userId: state.user?.id,
          receiverID: userId,
        }
      );
      state = await dispatch(MessageActions.ADD_USER_MESSAGES, {
        messages: newPage,
        userId,
      });
      if (newPage && newPage.length < 50) {
        state.messages[userId].isLastPage = true;
      }
      state.messages[userId].pageIndex++;
      return { ...state };
    } catch (error) {
      console.log(error);
      return state;
    }
  },

  CLEAR_USER_NOTIFICATION: (state, userId) => {
    state.messageNotifications.delete(userId);
    return { ...state };
  },

  SEND_MESSAGE: (state, message) => {
    state.socket?.emit(SEND_MESSAGE, message);
    return state;
  },

  MESSAGE_SEEN: async (state, userId) => {
    const messages = state.messages[userId]?.data;
    console.log("message seen",userId)
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
    console.log(notifications)
    state.messageNotifications = new Set(notifications);
    return { ...state };
  },

  ADD_MESSAGE_NOTIFICATION: (state, userId) => {
    if (state.room && state.room != userId && userId !== state.user?.id) {
      state.messageNotifications.add(userId);
    }
    return { ...state };
  },

  ADD_USER_MESSAGES: (state, { userId, messages }) => {
    if (!state.messages[userId]) {
      state.messages[userId] = { data: [], isLastPage: false, pageIndex: 1 };
    }
    state.messages[userId].data = [...state.messages[userId].data, ...messages];
    return { ...state };
  },

  SET_USER_MESSAGES: (state, { userId, messages }) => {
    if (!state.messages[userId]) {
      state.messages[userId] = {
        data: messages,
        isLastPage: false,
        pageIndex: 1,
      };
    }
    return { ...state };
  },

  SET_LAST_PAGE: (state, { userId }) => {
    state.messages[userId].isLastPage = true;
    return { ...state };
  },
};
