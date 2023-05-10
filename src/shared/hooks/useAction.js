import { useCallback, useState } from "react";
export function useActionDispatcher(initialState) {
  const [state, setState] = useState(initialState);
  const dispatch = useCallback(
    async (action, payload) => {
      let newState;
      if (!action) {
        return state;
      }
      if (action.constructor.name === "AsyncFunction") {
        newState = await action(state, payload, dispatch);
      } else if (action.constructor.name === "Function") {
        newState = action(state, payload, dispatch);
      } else {
        return state;
      }
      if (newState !== state) {
        setState(newState);
      }
      return newState;
    },
    [state]
  );
  return [state, dispatch];
}
