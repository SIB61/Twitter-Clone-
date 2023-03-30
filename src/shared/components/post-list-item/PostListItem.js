import styles from "./PostListItem.module.css";
import { CommentIcon } from "@/shared/components/icons/CommentIcon";
import { LikeIcon } from "@/shared/components/icons/LikeIcon";
import { Content } from "../content/Content";
import { Avator } from "@/features/user/components/avatar/Avatar";
import { useEffect } from "react";
import Link from "next/link";
export function PostListItem({ post = {}, onClick , onActionClick }) {
  useEffect(()=>{console.log(post)},[])
  const createdAt = "1 hr ago" 
  return (
    <div className={styles.postCard} onClick={onClick}>
      <Link onClick={(e)=>e.stopPropagation()} href={`/profile/${post.user?.id}`}>
      <Avator src={post.user.image}/>
      </Link>
      <div>
        <div className={styles.name}>
        <div>{post.user.name}</div>
        <div>@{post.user.username}</div>
          .
        <div>{createdAt}</div>
        </div>
        <Content image={post.image} content={post.content}/>
         <div className={styles.actions}>
          <span
            style={post.isLiked ? { color: "var(--pink)", fill: "var(--pink)" } : {  }}
            className={styles.likeButton + " " + styles.actionButton}
            onClick={(e)=>{e.stopPropagation(); onActionClick('like')}}
          >
            <LikeIcon className={styles.likeIcon} isLiked={post.isLiked} />{" "}
            {post.totalLikes}
          </span>
          <span
            className={styles.commentButton + " " + styles.actionButton}
            onClick={(e)=>{e.stopPropagation(); onActionClick('comment')}}
          >
            <CommentIcon className={styles.commentIcon} /> {post.totalComments || post.totalReplies}
          </span>
          </div>
      </div>
    </div>
  );
}
