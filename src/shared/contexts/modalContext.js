import {createContext, useCallback, useState} from 'react'
import { Modal } from '../components/modal/Modal';
export const modalContext=createContext()
export function ModalProvider({children}){
 const [modal,setModal] = useState();
 const open = useCallback((view)=>setModal(view))
 const close = useCallback(()=>setModal(undefined))
 return <modalContext.Provider value={{open,close}}>
     <>
      {children}
      {
        modal && 
       <Modal>
        {modal}
       </Modal>
      }
     </>
 </modalContext.Provider> 
}
