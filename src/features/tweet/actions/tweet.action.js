import { useAsyncReducer } from "@/shared/hooks/useAsyncReducer";
import axios from "axios";
import { postReply, postRetweet } from "../services/client/create-tweet.client";

export const TweetActions = {
  LIKE: "LIKE",
  UNLIKE: "UNLIKE",
  REPLY: "REPLY",
  RETWEET: "RETWEET",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  LOAD_REPLIES: "LOAD_REPLIES",
};

const tweetReducer = (state, action) => {
  switch (action.type) {
    case TweetActions.RETWEET:
      return { ...state, totalRetweets: state.totalRetweets + 1 };

    case TweetActions.LIKE:
      return { ...state, totalLikes: state.totalLikes + 1, isLiked: true };

    case TweetActions.UNLIKE:
      return { ...state, totalLikes: state.totalLikes - 1, isLiked: false };

    case TweetActions.REPLY:
      return { ...state, totalReplies: state.totalReplies + 1, replies: [action.payload,...state.replies] };

    case TweetActions.UPDATE:
      return { ...state,...action.payload };

    case TweetActions.LOAD_REPLIES:
      return {...state, replyPageIndex:state.replyPageIndex+1,replies:[...state.replies,...action.payload]}
     
    default:
      return state;
  }
};

export const TweetActionMiddleWares = {
  LIKE: async (state) => {
     axios.post("/api/like", { tweetId: state.id });
  },

  UNLIKE: async (state) => {
     axios.delete(`/api/like?tweetId=${state.id}`);
  },

  REPLY: async (state,action) => {
    const newReply = await postReply({
      text:action.payload.text,
      image:action.payload.image,
      tweetId:state.id
    })
    return newReply
  },

  RETWEET: async (state,action) => {
    const newTweet =  postRetweet({ tweetId: state.id });
    return true
  },

  UPDATE: async (state,action) => {
    const formData = new FormData();
    formData.append("content", action.payload.text);
    formData.append("image", action.payload.image?.file);
    formData.append("imageUrl", action.payload.image?.src);
    const newPostRes = await fetch("/api/tweet/" + state.id, {
      method: "PATCH",
      body: formData,
    });
    const newPost = await newPostRes.json();
    return newPost
  },

  DELETE: async () => {
     const deleteResult = await deleteTweet(state.id);
     return deleteResult
  },

  LOAD_REPLIES: async (state) => {
    const { data } = await axios.get(
      `/api/reply?pageIndex=${state.replyPageIndex}&pageSize=10&tweetId=${state.id}`
    );
    return data.data
  },

};

export function useTweetReducer(initialState) {
  const [state, dispatch] = useAsyncReducer(tweetReducer, initialState);
  return [state, dispatch];
}
