import styles from './LoadingBar.module.css'
export function LoadingBar({loading}) {
  return (
    <div
      className={
        loading.isStarted &&
        `${styles.loadingBar} ${loading.isCompleted ? styles.completed : styles.loading}`
      }
    ></div>
  );
}
