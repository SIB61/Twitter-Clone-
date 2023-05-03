import { useReducer } from "react";

export const MessageActions = {
  ADD_MESSAGE:"ADD_MESSAGE",
  SEND_MESSAGE:"SEND_MESSAGE",
  ADD_MESSAGE_NOTIFICATION:"ADD_MESSAGE_NOTIFICATION",
  CLEAR_MESSAGE_NOTIFICATION:"CLEAR_MESSAGE_NOTIFICATION"
}

function  messageReducer (state,action) {
  switch(action.type){
    case MessageActions.SEND_MESSAGE:
    break;

    case MessageActions.ADD_MESSAGE:
    break;

    case MessageActions.ADD_MESSAGE_NOTIFICATION:
    break;

    case MessageActions.CLEAR_MESSAGE_NOTIFICATION:
    break;
  }
}

const initialState = {
  messageNotifications:[],
  messages:{}
}

export function useMessageAction(){
  const [state,dispatch] = useReducer(messageReducer,initialState)  
  // const {message}
}
