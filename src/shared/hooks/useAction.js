import { useCallback, useState } from "react";
export function useActionDispatcher(initialState) {
  let [state, setState] = useState(initialState);
  const dispatch = useCallback(
    async (action, payload) => {
      if (!action) {
        return state;
      }
      let newState = (currentState) => currentState;
      if (action.constructor.name === "AsyncFunction") {
        newState = await action(payload, state, dispatch);
      } else if (action.constructor.name === "Function") {
        newState = action(payload, state, dispatch);
      }
      setState(newState);
      console.log(action.name, newState);
      return newState;
    },
    [state]
  );
  return [state, dispatch];
}
