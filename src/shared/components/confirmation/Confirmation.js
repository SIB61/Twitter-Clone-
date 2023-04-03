import styles from './Confirmation.module.css'
export function Confirmation({title="Are you sure?",  subtitle ,onConfirm=()=>{},onReject=()=>{}}){
  return <div className={styles.confirmation}>
      <div className={styles.title}>{title}</div>
      <div className={styles.subtitle}>{subtitle}</div>
      <div className={styles.buttons}>
       <button className='btn btn-primary' onClick={onReject}>No</button>
       <button className='btn btn-primary' onClick={onConfirm}>Yes</button>
    </div>
  </div>
}
