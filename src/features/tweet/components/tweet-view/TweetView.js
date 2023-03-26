import { Avator } from "@/features/user/components/avatar/Avatar";
import styles from "./TweetView.module.css";
import { CommentIcon } from "@/shared/components/icons/CommentIcon";
import { LikeIcon } from "@/shared/components/icons/LikeIcon";
import { useToggle } from "@/shared/hooks/useToggle";
import axios from "axios";
import { useEffect, useState } from "react";
export function TweetView({ tweet = {} }) {
  const like = async () => {
    isLiked? setTotalLikes(likes=>likes-1): setTotalLikes(likes=>likes+1)
    toggleLiked()
    await axios.post(`/api/tweet/${tweet.tweetId}/like`) 
  }
  const [isLiked,toggleLiked] = useToggle(tweet.isLiked)
  const [totalLikes,setTotalLikes] = useState(tweet.totalLikes)

  return (
    <div className={styles.postCard}>
      <Avator src={tweet.user?.image} />
      <div>
        <div className={styles.names}>
          <span className={styles.name}>{tweet.user?.name}</span>
          <span className={styles.username}> @{tweet.user?.username} . 6h</span>
        </div>
        {tweet.post && <div className={styles.post}>{tweet.post}</div>}
        {tweet.image && (
          <div>
            <img src={tweet.image} className={styles.image} />
          </div>
        )}
        <div className={styles.actions}>
          <span style={ isLiked ? {color: 'var(--pink)',fill:'var(--pink)'}:{}} onClick={like} className={styles.likeButton + " " + styles.actionButton}>
            <LikeIcon className={styles.likeIcon} isLiked={isLiked} /> {totalLikes}
          </span>
          <span  className={styles.commentButton + " " + styles.actionButton}>
            <CommentIcon className={styles.commentIcon} /> {tweet.totalComments}
          </span>
        </div>
      </div>
    </div>
  );
}
