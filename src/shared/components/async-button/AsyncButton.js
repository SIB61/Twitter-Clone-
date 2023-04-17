import { useCustomState } from "@/shared/hooks/useCustomState";
import styles from "./AsyncButton.module.css";
export function AsyncButton({
  onClickAsync = async () => {},
  children,
  className,
}) {
  const loading = useCustomState(false);
  const onClick = async (e) => {
    loading.set(true);
    await onClickAsync(e);
    loading.set(false);
  };
  return (
    <button onClick={onClick} className={`${className} ${styles.button}`}>
      <div className={loading.value ? styles.hide : styles.show}>
        {children}
      </div>
      <div className={`${loading.value ? styles.show : styles.hide} ${styles.loading}`}>
        <div className="loader"></div>
      </div>
    </button>
  );
}
