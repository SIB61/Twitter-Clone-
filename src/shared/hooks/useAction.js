import { useCallback, useState } from "react";
export function useActionDispatcher(initialState) {
  const [state, setState] = useState(initialState);
  const dispatch = useCallback(async(action,payload) => {
    let newState;
    if(!action){
      return
    }
    if (action.constructor.name === "AsyncFunction") {
       newState = await action(state, payload, dispatch);
    } else {
       newState = action(state, payload, dispatch);
    }
    setState(newState);
    return newState
  }, [state]);
  return [state, dispatch];
}



    // Promise.resolve(newStateOrPromise).then((value) => {
    //   setState(value);
    // });
