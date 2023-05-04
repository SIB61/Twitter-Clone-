import { useAsyncReducer } from "@/shared/hooks/useAsyncReducer";
const MessageActions = {
  SEND_MESSAGE: "SEND_MESSAGE",
  ADD_MESSAGE: "ADD_MESSAGE",
  SEE_MESSAGE: "SEE_MESSAGE",
  ADD_MESSAGE_NOTIFICATION: "ADD_MESSAGE_NOTIFICATION",
};

function messageReducer(state, action) {
  switch (action.type) {
    case MessageActions.ADD_MESSAGE:
      if (!state.messages[action.payload.room]) {
        state.messages[action.payload.room] = [];
      }
      state.messages[action.payload.room].unshift(action.payload.message);
      return { ...state };

    case MessageActions.ADD_MESSAGE_NOTIFICATION:
      if(!state.messageNotifications)
      {
        state.messageNotifications = new Set()
      }
      state.messageNotifications.add(action.payload);
      return { ...state };

    default:
      return state;
  }
}

function messageMiddleware(state, action, dispatch) {
  switch (action.type) {
  }
}

export function useMessageReducer(initialState) {
  return useAsyncReducer(messageReducer, initialState, messageMiddleware);
}
