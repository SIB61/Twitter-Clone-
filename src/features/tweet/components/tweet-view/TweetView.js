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
import {
  TweetActionMiddleWares,
  TweetActions,
  useTweetReducer,
} from "../../actions/tweet.action";
export function TweetView({
  tweet = {},
  detailed = false,
  onDelete = () => {},
  onComment = () => {},
  parentType = "",
}) {
  const { data: session, status } = useSession();

  const [tweetState, dispatch] = useTweetReducer(
    tweet.type === "retweet" ?({ ...tweet.parent,replyPageIndex:1 }):({...tweet,replyPageIndex:1})
  );

  // const [tweetState, setTweetState] = useState(
  //   tweet.type === "retweet" ? tweet.parent : tweet
  // );

  const expanded = useCustomState(false);
  // const replies = useListState(tweetState?.replies);
  const [repliesRef] = useAutoAnimate();
  const createReplyLoading = useCustomState(false);
  // const createToast = useToast();
  const [parent] = useAutoAnimate();
  const modal = useModal();
  // const replyPageIndex = useCustomState(1)

  const like = async () => {
    if (tweetState.isLiked) {
      dispatch({ type: TweetActions.UNLIKE }, TweetActionMiddleWares.UNLIKE);
    } else {
      dispatch({ type: TweetActions.LIKE }, TweetActionMiddleWares.LIKE);
    }
  };

  const sendComment = async ({ text, image }) => {
    if (text || image) {
      await dispatch(
        { type: TweetActions.REPLY, payload: { text, image: image?.file } },
        TweetActionMiddleWares.REPLY
      );
    }
  };

  function edit() {
    modal.open(
      <CreatePost
        text={tweetState.content?.text}
        image={tweetState.content?.image}
        submitButton="save"
        onSubmit={async ({ text, image }) => {
          await dispatch(
            { type: TweetActions.UPDATE, payload: { text, image } },
            TweetActionMiddleWares.UPDATE
          );
          modal.close();
        }}
      />
    );
  }

  const remove = () => {
    modal.open(
      <Confirmation
        subtitle="Do you really want to delete it?"
        onConfirm={async () => {
          modal.startLoading();
          await dispatch({
            type: TweetActions.DELETE,
          });
          modal.close()
        }}
      />
    );
  };

  const retweet = async () => {
    dispatch({ type: TweetActions.RETWEET },TweetActionMiddleWares.RETWEET);
  };

  const loadMoreComments = async () => {
    const { data: newReplies } = await axios.get(
      `/api/reply?pageIndex=${replyPageIndex.value}&pageSize=10&tweetId=${tweetState.id}`
    );
    replies.set((state) => [...state, ...newReplies.data]);
    replyPageIndex.set((state) => state + 1);
  };

  const onActionClick = (event) => {
    if (status === "authenticated") {
      if (event === "like") {
        like();
      } else if (event === "comment") {
        expanded.set(!expanded.value);
        if (
          tweetState.replies?.length === 0 &&
          tweetState.totalReplies !== 0 &&
          !expanded.value
        ) {
          dispatch({type:TweetActions.LOAD_REPLIES},TweetActionMiddleWares.LOAD_REPLIES)
        }
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
          <PostListItem
            post={tweetState}
            parentType={parentType}
            onActionClick={onActionClick}
          />
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
                  {tweetState.replies.map((reply) => (
                    <TweetView key={reply.id} tweet={reply}></TweetView>
                  ))}
                </div>
                {tweetState.replies.length < tweetState.totalReplies &&
                  tweetState.replies.length != 0 && (
                    <div className={styles.seeMoreComments}>
                      <AsyncButton onClickAsync={loadMoreComments}>
                        See more replies
                      </AsyncButton>
                    </div>
                  )}
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
