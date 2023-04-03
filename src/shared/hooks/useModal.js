import { useContext } from "react"
import { modalContext } from "../contexts/modalContext"

export function useModal(){
  const {open,close} = useContext(modalContext) 
  return {open,close}
}
