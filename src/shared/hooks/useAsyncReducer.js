import { useReducer } from "react";

export function useAsyncReducer(reducer, initialState) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const asyncDispatch = async (action, middleware) => {
    if (middleware) {
      try {
        action.payload = await middleware(state, action, dispatch);
      } catch (err) {
        action.error = err;
      }
    }
    dispatch(action);
  };
  return [state, asyncDispatch];
}
