import { ModalContext } from "@/utils/contexts"
import { useContext } from "react"

export function useModal(){
  const {open,close,startLoading,completeLoading} = useContext(ModalContext) 
  return {open,close,startLoading,completeLoading}
}
