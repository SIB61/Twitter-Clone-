import {createContext, useCallback, useState} from 'react'
import { ModalContext } from '@/utils/contexts';
import { Modal } from '../common/modal/Modal';
import { LoadingBar } from '../common/loading-bar/LoadingBar';
import { useLoading } from '@/hooks/useLoading';
export function ModalProvider({children}){
 const [modal,setModal] = useState();
 const {loading,start,complete} = useLoading()
 const open = (view)=>setModal(view)
 const close = async ()=>{
   await complete()
   setModal(undefined)
 }
 return <ModalContext.Provider value={{open,close,startLoading:start,completeLoading:complete}}>
     <>
      {children}
      {
        modal && 
       <Modal>
        <LoadingBar loading={loading}/>
        {modal}
       </Modal>
      }
     </>
 </ModalContext.Provider> 
}
