import { useContext, useEffect } from "react";
import { LoadingBar } from "../loading-bar/LoadingBar";
import styles from "./Modal.module.css";
import { RxCross1 } from "react-icons/rx";
import { ModalContext } from "@/core/layouts/main-layout";
export function Modal({ children, onClose, loading }) {

  const setModal = useContext(ModalContext)
  if(!onClose){
    onClose = () => setModal(null)
  }

  return (
    <div className={styles.modalBg}>
      <div className={styles.modal}>
        <div
          className="btn btn-icon"
          onClick={() => {
            onClose();
          }}
        >
          <RxCross1 />
        </div>
        {loading && (
          <LoadingBar loading={loading} />
        )}
        {children}
      </div>
    </div>
  );
}
