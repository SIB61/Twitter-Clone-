import styles from './Input.module.css'
export function Input({placeHolder,onChange,value,style,className}){
  return <div  className={styles.input+" "+className} style={style}>
    <input onChange={onChange} value={value} placeholder=' ' />
    <label>{placeHolder}</label>
  </div>
}
