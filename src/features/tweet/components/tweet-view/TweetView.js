import { Avator } from "@/features/user/components/avatar/Avatar";
import styles from "./TweetView.module.css";
import Image from "next/image";
import { CommentIcon } from "@/shared/components/icons/CommentIcon";
import { LikeIcon } from "@/shared/components/icons/LikeIcon";
import { useToggle } from "@/shared/hooks/useToggle";
export function TweetView({ tweet = {} }) {
  return (
    <div className={styles.postCard}>
      <Avator />
      <div>
        <div className={styles.names}>
          <span className={styles.name}>{tweet.user.name}</span>
          <span className={styles.username}> {tweet.user.username} . 6h</span>
        </div>
        {tweet.post && <div className={styles.post}>{tweet.post}</div>}
        {tweet.imgUrl && (
          <div>
            <img src={tweet.imgUrl} className={styles.image} />
          </div>
        )}
        <div className={styles.actions}>
          <span className={styles.commentButton + " " + styles.actionButton}>
            <CommentIcon className={styles.commentIcon} /> {tweet.totalComments}
          </span>
          <span className={styles.likeButton + " " + styles.actionButton}>
            <LikeIcon className={styles.likeIcon} /> {tweet.totalLikes}
          </span>
        </div>
      </div>
    </div>
  );
}
