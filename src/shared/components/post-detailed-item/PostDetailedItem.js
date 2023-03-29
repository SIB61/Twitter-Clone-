import { useToggle } from "@/shared/hooks/useToggle";
import { useState } from "react";
import styles from './PostDetailedItem.module.css'
import { MiniProfile } from "../mini-profile/MiniProfile";
import { LikeIcon } from "../icons/LikeIcon";
import { CommentIcon } from "../icons/CommentIcon";
import { Content } from "../content/Content";
import Link from "next/link";

export function PostDetailedItem({post,onActionClick,onClick}){
  const createdAt = (new Date(post.createdAt)).toDateString();
  return (
    <div className={styles.post} onClick={onClick}>
      <Link href={`/profile/${post?.user?.id}`}>
      <MiniProfile user={post?.user}  />
      </Link>
      <div className={styles.content}>
      <Content image={post?.image} content={post?.content} />
      </div>
      <div className={styles.date}>{createdAt}</div>
      <div className="h-divider"></div>
      <div className={styles.numbers}>
        <span>
          {" "}
          <span className={styles.number}> {post.totalLikes} </span> likes
        </span>
        <span>
          {" "}
          <span className={styles.number}> {post.totalComments} </span>{" "}
          comments
        </span>
      </div>
      <div className="h-divider"></div>

      <div className={styles.actions}>
        <span
          style={post.isLiked ? { color: "var(--pink)", fill: "var(--pink)" } : {}}
          className={styles.likeButton + " " + styles.actionButton}
          onClick={(e)=>{e.stopPropagation();onActionClick('like')}}
        >
          <LikeIcon className={styles.likeIcon} isLiked={post.isLiked} />{" "}
        </span>
        <span
          className={styles.commentButton + " " + styles.actionButton}
          onClick={(e)=>{e.stopPropagation();onActionClick('comment')}}
        >
          <CommentIcon className={styles.commentIcon} /> 
        </span>
      </div>
    </div>
  );
}
