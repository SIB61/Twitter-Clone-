import { CgMore } from "react-icons/cg";
import { Avator } from "../avatar/Avatar";
import styles from "./MiniProfile.module.css";
export function MiniProfile({user,onClick}) {
  return (
    <div className={styles.profile} onClick={onClick}>
      <Avator src={user.image} size="48" />
      <div>
        <p className={styles.name}>{user.name}</p>
        <p className={styles.username}>@{user.username}</p>
      </div>
      <CgMore />
    </div>
  );
}
