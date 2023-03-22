import { Avator } from "@/features/user/components/avatar/Avatar";
import styles from "./CreateTweet.module.css";
import { ImgIcon } from "@/shared/components/icons/ImgIcon";
import { GrImage } from "react-icons/gr";
import Dp from "public/images/dp.jpg";
import { useToggle } from "@/shared/hooks/useToggle";
import { useState } from "react";
export function CreateTweet({ expanded }) {
  const [expand,setExpand] = useState(expanded)
  return (
    <div className={styles.createPost}>
      <div className={styles.avatar}>
        <Avator src={Dp} size="3rem" />
      </div>
      <div className={styles.fields}>
        {expand && (
          <select defaultValue="everyone" className={styles.audience}>
            <option>Everyone</option>
          </select>
        )}
        <textarea

          placeholder="What's happening"
          className={styles.textarea}
          onClick={()=>{
            if(!expand){
              setExpand(true)
            }
          }}
        ></textarea>
        {expand && (
          <>
            <select defaultValue="everyone" className={styles.replyAudience}>
              <option value="everyone">Everyone can reply</option>
            </select>
            <div className="h-divider"></div>
          </>
        )}
        <div className={styles.actions}>
          <div className={styles.attachment}>
            <div className="btn btn-icon">
              <ImgIcon color="rgb(29, 155, 240)" width="1.4rem" />
            </div>
          </div>
          <div>
            <button className={"btn btn-primary"} style={{ width: "6rem" }}>
              Tweet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
