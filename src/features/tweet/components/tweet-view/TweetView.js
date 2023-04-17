import axios from "axios";
import styles from "./TweetView.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { PostDetailedItem } from "@/shared/components/post-detailed-item/PostDetailedItem";
import { useSession } from "next-auth/react";
import { PostListItem } from "@/shared/components/post-list-item/PostListItem";
import { useModal } from "@/shared/hooks/useModal";
import { CreatePost } from "@/shared/components/create-post/CreatePost";
import { Confirmation } from "@/shared/components/confirmation/Confirmation";
import { deleteRetweet, deleteTweet } from "../../services/client/delete-tweet";
import { useCustomState } from "@/shared/hooks/useCustomState";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useAutoResizeTextArea } from "@/shared/hooks/useAutoResizeTextArea";
import {
  postReply,
  postRetweet,
} from "../../services/client/create-tweet.client";
import { useListState } from "@/shared/hooks/useListState";
import { useToast } from "@/shared/hooks/useToast";
import { RetweetIcon } from "@/shared/components/icons/RetweetIcon";
import { CgMore } from "react-icons/cg";
import Link from "next/link";
import { Dropdown } from "@/shared/components/dropdown/Dropdown";
import { AsyncButton } from "@/shared/components/async-button/AsyncButton";
export function TweetView({
  tweet = {},
  detailed=false,
  onDelete = () => {},
  onComment = () => {},
  parentType=''
}) {
  const { data: session, status } = useSession();
  const [tweetState, setTweetState] = useState(
    tweet.type === "retweet" ? tweet.parent : tweet
  );
  const expanded = useCustomState(false);
  const replies = useListState(tweetState?.replies);
  const [repliesRef] = useAutoAnimate();
  const createReplyLoading = useCustomState(false);
  const createToast = useToast();
  const [parent] = useAutoAnimate();
  const modal = useModal();
  const replyPageIndex = useCustomState(1)

  const like = async () => {
    try {
      if (tweetState.isLiked) {
        setTweetState((state) => ({
          ...state,
          totalLikes: state.totalLikes - 1,
          isLiked: false,
        }));
        await axios.delete(`/api/like?tweetId=${tweetState.id}`, {
          tweetId: tweetState.id,
        });
      } else {
        setTweetState((state) => ({
          ...state,
          totalLikes: state.totalLikes + 1,
          isLiked: true,
        }));
        await axios.post("/api/like", { tweetId: tweetState.id });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendComment = async ({text,image}) => {
    if (text || image) {
      createReplyLoading.set(true);
      try {
        const newComment = await postReply({
          text: text,
          image: image?.file,
          tweetId: tweetState.id,
        });
        onComment(newComment);
        setTweetState((state) => ({
          ...state,
          totalReplies: state.totalReplies + 1,
        }));
        replies.add(newComment);
      } catch (err) {
        console.log(err);
      }
      createReplyLoading.set(false);
    }
  };

  const editTweet = async ({text,image}) => {
    modal.startLoading();
    const formData = new FormData();
    formData.append("content", text);
    formData.append("image", image?.file);
    formData.append("imageUrl", image?.src);
    const newPost = await fetch("/api/tweet/" + tweet.id, {
      method: "PATCH",
      body: formData,
    });
    const post = await newPost.json();
    modal.close();
    setTweetState(post);
  };

  function edit() {
    modal.open(
      <CreatePost
        text={tweetState.content?.text}
        image={tweetState.content?.image}
        submitButton="save"
        onSubmit={editTweet}
      />
    );
  }

  const remove = () => {
    modal.open(
      <Confirmation
        subtitle="Do you really want to delete it?"
        onConfirm={async () => {
          modal.startLoading();
          const deleteResult = await deleteTweet(tweetState.id);
          if (deleteResult) {
            modal.close();
            createToast({ text: "Deleted successfully" });
            if (tweet.type !== "retweet") onDelete(tweet);
          } else {
            createToast({ text: "Something went wrong" });
          }
        }}
      />
    );
  };

  const retweet = async () => {
    setTweetState((state) => ({
      ...state,
      totalRetweets: state.isRetwitted
        ? state.totalRetweets - 1
        : state.totalRetweets + 1,
      isRetwitted: !state.isRetwitted,
    }));
    const newTweet = postRetweet({ tweetId: tweetState.id });
    createToast({
      text: `Successfully retweeted ${tweetState.user.username}'s tweet`,
    });
  };


  const loadMoreComments = async()=>{
    const {data:newReplies} = await axios.get(`/api/reply?pageIndex=${replyPageIndex.value}&pageSize=10&tweetId=${tweetState.id}`)
    replies.set(state=>[...state,...newReplies.data])
    replyPageIndex.set(state=>state+1)
  }

  const onActionClick = (event) => {
    if (status === "authenticated") {
      if (event === "like") {
        like();
      } else if (event === "comment") {
        expanded.set(!expanded.value);
        if(replies.value.length === 0 && tweetState.totalReplies !== 0 && !expanded.value){
         loadMoreComments()
        }
        console.log(tweet, tweetState);
      } else if (event === "edit") {
        edit();
      } else if (event === "delete") {
        remove();
      } else if (event === "retweet") {
        retweet();
      }
    }
  };

  const retweetOptionClick = async (option) => {
    if (option === "delete") {
      modal.open(
        <Confirmation
          subtitle="You want to delete this retweet."
          onConfirm={async () => {
            modal.startLoading();
            const deleteResult = await deleteRetweet(tweet.id);
            await modal.close();
            if (deleteResult) {
              onDelete(tweet);
              createToast({ text: "Deleted successfully" });
            } else {
              createToast({ text: "Something went wrong" });
            }
          }}
          onReject={modal.close}
        />
      );
    }
  };

  return (
    <div ref={parent}>
      {tweet.type === "retweet" && (
        <div className={styles.retweetUser}>
          <RetweetIcon style={{ height: "1.2rem", width: "1.2rem" }} />{" "}
          <Link
            href={`/profile/${tweet.user?.id}`}
            className={styles.retweetUsername}
          >
            {tweet.user?.username}
          </Link>
          <span>retweeted </span>
          {session?.user.id === tweet.user?.id && (
            <Dropdown options={["delete"]} onOptionClick={retweetOptionClick}>
              <div className="btn btn-ghost" style={{ padding: "0.2rem" }}>
                <CgMore />
              </div>
            </Dropdown>
          )}
        </div>
      )}
      {tweetState ? (
        <>
          <PostListItem post={tweetState} parentType = {parentType} onActionClick={onActionClick} />
          {expanded.value && (
            <div className={styles.expanded}>
              <div>
                <div>
                  <CreatePost
                    onSubmit={sendComment}
                    placeholder="Write your reply"
                    isLoading={createReplyLoading.value}
                    submitButton="reply"
                  />
                </div>
                <div ref={repliesRef}>
                  {replies.value.map((reply) => (
                    <TweetView
                      onDelete={replies.remove}
                      key={reply.id}
                      tweet={reply}
                      parentType = {tweetState.type}
                    ></TweetView>
                  ))}
                </div>
                {
                replies.value.length < tweetState.totalReplies && replies.value.length!=0 &&
                <div className={styles.seeMoreComments}>
                     <AsyncButton onClickAsync={loadMoreComments}>
                        See more replies
                     </AsyncButton> 
                </div>
                }
              </div>
            </div>
          )}
        </>
      ) : (
        <div className={styles.unavailable}>
          <div>unavailable</div>
        </div>
      )}
    </div>
  );
}
