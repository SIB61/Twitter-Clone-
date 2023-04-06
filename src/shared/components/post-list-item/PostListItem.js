import styles from "./PostListItem.module.css";
import { CommentIcon } from "@/shared/components/icons/CommentIcon";
import { LikeIcon } from "@/shared/components/icons/LikeIcon";
import { Content } from "../content/Content";
import { Avator } from "@/features/user/components/avatar/Avatar";
import Link from "next/link";
import { Dropdown } from "../dropdown/Dropdown";
import { useSession } from "next-auth/react";
export function PostListItem({ post = {}, onClick, onActionClick }) {
  const createdAt = "1 hr ago";
  const { data: session } = useSession();
  const isMyPost = session && session?.user?.id === post?.user?.id;
  return (
    <div className={styles.postCard} onClick={onClick}>
      <Link
        onClick={(e) => e.stopPropagation()}
        href={`/profile/${post.user?.id}`}
      >
        <Avator src={post.user.image} />
      </Link>
      <div>
        <div className={styles.name}>
          <div>{post.user.name}</div>
          <div>@{post.user.username}</div>.<div>{createdAt}</div>
          {isMyPost && (
            <Dropdown
              className={`${styles.dropdown}`}
              onOptionClick={onActionClick}
              options={["edit", "delete"]}
            />
          )}
        </div>
        <Content image={post.content.image} content={post.content.text} />
        <div className={styles.actions}>
          <span
            style={
              post.isLiked ? { color: "var(--pink)", fill: "var(--pink)" } : {}
            }
            className={styles.likeButton + " " + styles.actionButton}
            onClick={(e) => {
              e.stopPropagation();
              onActionClick("like");
            }}
          >
            <LikeIcon className={styles.likeIcon} isLiked={post.isLiked} />{" "}
            {post.totalLikes}
          </span>
          <span
            className={styles.commentButton + " " + styles.actionButton}
            onClick={(e) => {
              e.stopPropagation();
              onActionClick("comment");
            }}
          >
            <CommentIcon className={styles.commentIcon} />{" "}
            {post.totalComments}
          </span>
        </div>
      </div>
    </div>
  );
}
