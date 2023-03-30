import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "@/core/layouts/main-layout";
import { useRouter } from "next/router";
import { PostDetailedItem } from "@/shared/components/post-detailed-item/PostDetailedItem";
import { Modal } from "@/shared/components/modal/Modal";
import { useLoading } from "@/shared/hooks/useLoading";
import { InputModal } from "@/shared/components/input-modal/InputModal";
import { useSession } from "next-auth/react";
import { postComment } from "@/features/comment/services/client/post-comment";
import { PostListItem } from "@/shared/components/post-list-item/PostListItem";
export function TweetView({ tweet = {}, detailed }) {
  const [tweetState, setTweetState] = useState(tweet);
  const { data: session, status } = useSession();
  const loading = useLoading();
  const setModal = useContext(ModalContext);
  const router = useRouter()

  const like = async () => {
    try {
      tweetState.isLiked
        ? setTweetState((state) => ({
            ...state,
            totalLikes: state.totalLikes - 1,
            isLiked: false,
          }))
        : setTweetState((state) => ({
            ...state,
            totalLikes: state.totalLikes + 1,
            isLiked: true,
          }));
      await axios.post(`/api/tweet/${tweet.id}/like`);

    } catch (err) {
      console.log(err);
    }
  };

  const sendComment = async (value) => {
    if (value)
    {
      loading.start()
      try {
        await postComment({ content: value, tweetId: tweet.id });
        setTweetState(state=>({...state,totalComments:state.totalComments+1}))
        } catch (err) {
      }
      await loading.complete()
      setModal(undefined)
      if(detailed){
        router.replace(router.asPath)
      }
    }
  };

  const comment = () => {
    setModal(
      <Modal loading={loading.loading}>
        <InputModal
          onSubmit={sendComment}
          placeholder="Write your comment"
          user={session.user}
        />
      </Modal>
    );
  };

  const onClick=()=>{
     router.push(`/tweet/${tweet.id}`)
  }

  const onActionClick = (event) => {
    if (status === "authenticated") {
      if (event === "like") {
        like();
      } else if (event === "comment") {
        comment();
      }
    }
  };

  return detailed? <PostDetailedItem post={tweetState} onActionClick={onActionClick} />:<PostListItem post={tweetState} onActionClick={onActionClick} onClick={onClick}/>;
}
