import { useEffect, useRef } from "react"
export function useAutoResizeTextArea(value){
  const ref = useRef()
  useEffect(()=>{
    ref.current.style.height = "0px"
    ref.current.style.height = ref.current.scrollHeight+"px"
  },[value])
  return ref
}
