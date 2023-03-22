import styles from './Modal.module.css'
import { RxCross1 } from 'react-icons/rx'
export function Modal({children,onClose}){
  return (<div className={styles.modalBg}>
    <div className={styles.modal}>
      <div className='btn btn-icon' onClick={()=>{onClose()}}>
       <RxCross1/> 
      </div>
       {children}
    </div>
  </div>)
}
