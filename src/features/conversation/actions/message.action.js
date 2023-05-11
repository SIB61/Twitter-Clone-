import { NEW_MESSAGE, SEE_MESSAGE, SEND_MESSAGE } from "@/constants";
import { generateVerificationToken } from "@/shared/utils/generateVerificationToken";
import axios from "axios";

export const MessageActions = {
  SET_SESSION: (session) => {
    return (state) => ({
      ...state,
      session,
    });
  },

  SET_ROOM: (room) => {
    return (state) => ({ ...state, room });
  },

  SET_SOCKET: (socket) => {
    return (state) => ({ ...state, socket });
  },

  ADD_MESSAGE: ({ message, room }, state) => {
    let roomMessages = state.messages[room]?.data;
    if (!roomMessages) roomMessages = [];
    roomMessages.unshift(message);
    return (currentState) => {
      if (!currentState.messages[room]) {
        currentState.messages[room] = { data: [] };
      }
      currentState.messages[room].data = roomMessages;
      return { ...currentState };
    };
  },

  FETCH_USER_MESSAGES: async ({ userId, pageSize = 50 }, state, dispatch) => {
    if (state.messages[userId]?.isLastPage) {
      return (state) => state;
    }
    try {
      const { data: response } = await axios.post(
        `/api/conversation/?pageIndex=${
          state.messages[userId].pageIndex + 1
        }&pageSize=${pageSize}`,
        {
          receiverID: userId,
        }
      );
      dispatch(MessageActions.ADD_USER_MESSAGES, {
        messages: response.data,
        userId,
      });
      return (state) => {
        state.messages[userId].pageIndex++;
        state.messages[userId].isLastPage =
          response.data && response.data.length < 50;
        return { ...state };
      };
    } catch (error) {
      return state;
    }
  },

  CLEAR_USER_NOTIFICATION: (userId, state) => {
    const newState = { ...state };
    newState.messageNotifications.delete(userId);
    return newState;
  },

  SEND_MESSAGE: async ({ message, room }, _, dispatch) => {
    const customId = generateVerificationToken(8);
    dispatch(MessageActions.ADD_MESSAGE, {
      message: {
        ...message,
        id: customId,
      },
      room: room,
    });

    const { data: response } = await axios.post("/api/message", {
      ...message,
      customId,
    });
    dispatch(MessageActions.MESSAGE_DELIVERED, response.data);
    return (state) => state;
  },

  MESSAGE_DELIVERED: ({ message, customId }, state) => {
    const newState = { ...state };
    const messages = newState.messages[message.receiver]?.data;
    if (messages) {
      for (let i = 0; i < messages.length; i++) {
        if (messages[i].id === customId) {
          messages[i] = message;
          break;
        }
      }
    }
    return (state) => {
      state.messages[message.receiver].data = messages;
      return { ...state };
    };
  },

  MESSAGE_SEEN: async (userId, state) => {
    const newState = { ...state };
    const messages = newState.messages[userId]?.data;
    if (messages && messages.length > 0) {
      for (let i = 0; i < messages.length; i++) {
        if (messages[i].seen && messages[i].receiver == userId) {
          break;
        }
        messages[i].seen = true;
      }
    }
    return newState;
  },

  FETCH_MESSAGE_NOTIFICATION: async () => {
    let { data: notifications } = await axios.get(
      "/api/notification?type=message"
    );
    return (state) => ({
      ...state,
      messageNotifications: new Set(notifications.data),
    });
  },

  ADD_MESSAGE_NOTIFICATION: ({ message, room }, state) => {
    const messageNotifications = state.messageNotifications;
    if (message.sender !== room) {
      messageNotifications.add(message.sender);
    } else {
      state.socket?.emit(SEE_MESSAGE, message);
    }
    return (currentState) => {
      currentState.messageNotifications = messageNotifications;
      return { ...currentState };
    };
  },

  ADD_USER_MESSAGES: ({ userId, messages }, state) => {
    const newState = { ...state };
    if (!newState.messages[userId]) {
      newState.messages[userId] = { data: [], isLastPage: false, pageIndex: 1 };
    }
    newState.messages[userId].data = [
      ...newState.messages[userId].data,
      ...messages,
    ];
    return newState;
  },

  SET_USER_MESSAGES: ({ userId, messages }) => {
    // let newState = { ...state };
    return (state) => {
      state.messages[userId] = {
        data: messages,
        isLastPage: messages && messages.length < 50,
        pageIndex: 1,
      };
      return { ...state };
    };
  },

  SET_LAST_PAGE: ({ userId }) => {
    return (state) => {
      state.messages[userId].isLastPage = true;
      return state;
    };
  },

  SEARCH_USER: async (searchText) => {
    let text = searchText.trim();
    if (text.length === 0) {
      return (state) => ({ ...state, chatUsers: state.users });
    }
    const { data: response } = await axios.post("/api/search", {
      user: text,
    });
    return (state) => ({ ...state, chatUsers: response.data });
  },

  SET_USERS: (users) => {
    return (state) => ({ ...state, users: users, chatUsers: users });
  },
};
