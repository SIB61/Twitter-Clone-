import { ToastContext } from "@/utils/contexts";
import { useContext } from "react";

export function useToast(){
  const create = useContext(ToastContext)
  return create
}
