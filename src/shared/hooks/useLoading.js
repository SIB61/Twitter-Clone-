import { useCallback, useEffect, useState } from "react";
export function useLoading(){
  const [isStarted,setStarted] = useState(false) 
  const [isCompleted,setCompleted] = useState(false)
  const start = useCallback(() => setStarted(true))
  const complete = useCallback(() => {
     setCompleted(true)
     setTimeout(()=>{
       setStarted(false)
       setCompleted(false)
     },300)
  })
  return {start,complete,isStarted,isCompleted}
}
