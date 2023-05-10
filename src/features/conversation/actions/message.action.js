import { NEW_MESSAGE, SEE_MESSAGE, SEND_MESSAGE } from "@/constants";
import { generateVerificationToken } from "@/shared/utils/generateVerificationToken";
import axios from "axios";


export const MessageActions = {

  SET_SESSION:(state,session)=>{
    const newState = {...state}
    newState.session = session
    return newState
  },

  SET_ROOM:(state,room)=>{
    const newState = {...state}
    newState.room = room
    return newState
  },

  SET_SOCKET:(state,socket)=>{
    const newState = {...state}
    newState.socket = socket
    return newState
  },

  ADD_MESSAGE: (state, message) => {
    let room;
    let newState = { ...state };
    console.log(message,state.session)

    if(message.type = "myMsg"){
      room = message.receiver;
    }else{
      room = message.sender;
      message.seen = true;
    }

    if (newState.room === room) {
      state.socket?.emit(SEE_MESSAGE, message);
    } else {
      newState.messageNotifications.add(room);
    }
    if (!newState.messages[room]) {
      newState.messages[room] = { data: [], isLastPage: false, pageIndex: 1 };
    }
    newState.messages[room].data.unshift(message);
    return newState;
  },

  FETCH_USER_MESSAGES: async (state, { userId, pageSize = 50 }, dispatch) => {
    if (state.messages[userId]?.isLastPage) {
      return state;
    }
    try {
      const { data: response } = await axios.post(
        `/api/conversation/?pageIndex=${
          state.messages[userId].pageIndex + 1
        }&pageSize=${pageSize}`,
        {
          userId: state.session.user?.id,
          receiverID: userId,
        }
      );
      state = await dispatch(MessageActions.ADD_USER_MESSAGES, {
        messages: response.data,
        userId,
      });
      if (response.data && response.data.length < 50) {
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
    const newState = { ...state };
    newState.messageNotifications.delete(userId);
    return newState;
  },

  SEND_MESSAGE: async (state, message, dispatch) => {
    // state.socket?.emit(SEND_MESSAGE, message);
    const customId = generateVerificationToken(8);
    let newState = await dispatch(MessageActions.ADD_MESSAGE, {
      ...message,
      id: customId,
    });

    const { data: response } = await axios.post("/api/message", {
      ...message,
      customId,
    });
    newState = await dispatch(MessageActions.MESSAGE_DELIVERED, response.data);
    return newState;
  },

  MESSAGE_DELIVERED: (state, { message, customId }) => {
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
    return newState;
  },

  MESSAGE_SEEN: async (state, userId) => {
    const newState = { ...state };
    const messages = newState.messages[userId]?.data;
    if (messages && messages.length > 0) {
      for (let i = 0; i < messages.length; i++) {
        if (messages[i].seen) {
          break;
        }
        messages[i].seen = true;
      }
    }
    return newState;
  },

  FETCH_MESSAGE_NOTIFICATION: async (state) => {
    let { data: notifications } = await axios.get(
      "/api/notification?type=message"
    );
    return { ...state, messageNotifications: new Set(notifications.data) };
  },

  // ADD_MESSAGE_NOTIFICATION: (state, {userId,currentRoom}) => {
  //   if (userId !== currentRoom) {
  //     state.messageNotifications.add(userId);
  //   }
  //   return { ...state };
  // },

  ADD_USER_MESSAGES: (state, { userId, messages }) => {
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

  SET_USER_MESSAGES: (state, { userId, messages }) => {
    let newState = { ...state };
    newState.messages[userId] = {
      data: messages,
      isLastPage: false,
      pageIndex: 1,
    };
    return newState;
  },

  SET_LAST_PAGE: (state, { userId }) => {
    const newState = { ...state };
    newState.messages[userId].isLastPage = true;
    return newState;
  },

  SEARCH_USER: async (state, searchText) => {
    let text = searchText.trim();
    let newState = { ...state };
    if (text.length === 0) {
      newState.chatUsers = newState.users;
    } else {
      const { data: response } = await axios.post("/api/search", {
        user: text,
      });
      newState.chatUsers = response.data;
    }
    return newState;
  },

  SET_USERS: (state, users) => {
    let newState = { ...state };
    newState.users = users;
    newState.chatUsers = users;
    return newState;
  },
};
