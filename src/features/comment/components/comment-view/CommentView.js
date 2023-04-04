import { InputModal } from "@/shared/components/input-modal/InputModal";
import { PostListItem } from "@/shared/components/post-list-item/PostListItem";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { postReply } from "../../services/client/post-reply";
import { useModal } from "@/shared/hooks/useModal";
import axios from "axios";
import { Confirmation } from "@/shared/components/confirmation/Confirmation";
export function CommentView({
  comment,
  onClick = () => {},
  onDelete = () => {},
  onComment = () => {}
}) {
  const { data: session } = useSession();
  const modal = useModal();
  const router = useRouter();
  const [commentState, setCommentState] = useState(comment);
  const sendReply = async (value) => {
    if (value) {
      modal.startLoading()
      try {
        const reply = await postReply({
          content: value,
          commentId: comment.id,
          tweetId: comment.tweet,
        });
        setCommentState((state) => ({
          ...state,
          totalReplies: state.totalReplies + 1,
        }));
        onComment(reply)
      } catch (err) {
        console.log(err);
      }
      modal.close();
    }
  };

  async function reply() {
    modal.open(
        <InputModal
          onSubmit={sendReply}
          placeholder="Write your reply"
          user={session.user}
        />
    );
  }

  const remove = async () => {
    modal.open(
      <Confirmation
        subtitle={"Delete this comment."}
        onConfirm={async () => {
          modal.startLoading()
          await axios.delete("/api/comment/" + comment.id);
          modal.close();
          onDelete(comment);
        }}
      />
    );
  };

  const update = () => {
    modal.open(
        <InputModal
          content={commentState.content}
          user={commentState.user}
          onSubmit={async (content) => {
            modal.startLoading()            
            const newComment = await axios.patch(`/api/comment/${comment.id}`, {
              content: content,
            });
            modal.close();
            setCommentState(newComment.data);
          }}
        />
    );
  };

  const onActionClick = (event) => {
    if (event === "comment") {
      reply();
    } else if (event === "delete") {
      remove();
    } else if (event === "edit") {
      update();
    }
  };

  if (!onClick) {
    onClick = (comment) => {
      router.push(`/comments/${comment.id}`);
    };
  }

  return (
      <PostListItem
        onClick={() => onClick(comment)}
        post={commentState}
        onActionClick={onActionClick}
      />
  );
}
