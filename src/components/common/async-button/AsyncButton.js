import { useState } from "react";
import styles from "./AsyncButton.module.css";
export function AsyncButton({
  onClickAsync = async () => {},
  disabled,
  children,
  className,
  style
}) {
  const [loading ,setLoading]= useState(false);
  const onClick = async (e) => {
    setLoading(true)
    await onClickAsync(e);
    setLoading(false)
  };
  return (
    <button style={style} disabled={disabled} onClick={onClick} className={`${className} ${styles.button}`}>
      <div className={loading ? styles.hide : styles.show}>
        {children}
      </div>
      <div className={`${loading ? styles.show : styles.hide} ${styles.loading}`}>
        <div className="loader"></div>
      </div>
    </button>
  );
}
