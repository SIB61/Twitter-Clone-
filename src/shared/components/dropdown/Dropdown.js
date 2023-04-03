import { GrMoreVertical } from 'react-icons/gr';
import styles from './Dropdown.module.css'
export function Dropdown({options=[],className,onOptionClick=()=>{} }) {
  return (
    <div className={`${styles.dropdown} ${className}`}>
      <div className={styles.dropbtn}>
        <GrMoreVertical />
      </div>
      <div className={styles.dropdownContent}>
        {
          options.map((option,index)=>(<button onClick={(e)=>{
            e.stopPropagation()
            onOptionClick(option)
          }} key={index} className='btn btn-ghost'>{option}</button>))
        }
      </div>
    </div>
  );
}
