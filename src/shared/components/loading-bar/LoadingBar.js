import styles from './LoadingBar.module.css'
export function LoadingBar({loading}) {
  return (
    <div
      className={
        loading.started ? 
        `${styles.loadingBar} ${loading.completed ? styles.completed : styles.loading}`:''
      }
    ></div>
  );
}
