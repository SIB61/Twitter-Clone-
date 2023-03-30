import { CgMore } from "react-icons/cg";
import styles from "./MiniProfile.module.css";
import { Avator } from "@/features/user/components/avatar/Avatar";
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
