import { useCallback, useState } from "react";
export function useActionDispatcher(initialState) {
  let [state, setState] = useState(initialState);
  const [dispatchPromise, setDispatchPromise] = useState();
  const dispatch = useCallback(
    async (action, payload) => {
      console.log(action.name);
      if (!action) {
        return state;
      }
      let newState = state;
      if (action.constructor.name === "AsyncFunction") {
        newState = await action(state, payload, dispatch);
      } else if (action.constructor.name === "Function") {
        newState = action(state, payload, dispatch);
      }
      setState(newState);
      return newState;
    },
    [state]
  );
  return [state, dispatch];
}
