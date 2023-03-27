import { useCallback, useEffect, useState } from "react";
export function useLoading(){
  const [isStarted,setStarted] = useState(false) 
  const [isCompleted,setCompleted] = useState(false)
  const start = useCallback(() => setStarted(true))
  const complete = useCallback(async() => {
    const response = new Promise((resolve,_reject)=>{
     setCompleted(true)
     setTimeout(()=>{
       setStarted(false)
       setCompleted(false)
       resolve()
     },300)
    })
    return response
  })
  return {start,complete,isStarted,isCompleted}
}
