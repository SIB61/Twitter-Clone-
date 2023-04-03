import axios from "axios";
import {   useState } from "react";
import { useRouter } from "next/router";
import { PostDetailedItem } from "@/shared/components/post-detailed-item/PostDetailedItem";
import { useLoading } from "@/shared/hooks/useLoading";
import { InputModal } from "@/shared/components/input-modal/InputModal";
import { useSession } from "next-auth/react";
import { postComment } from "@/features/comment/services/client/post-comment";
import { PostListItem } from "@/shared/components/post-list-item/PostListItem";
import { useModal } from "@/shared/hooks/useModal";
import { CreatePost } from "@/shared/components/create-post/CreatePost";
import { Confirmation } from "@/shared/components/confirmation/Confirmation";
import { deleteTweet } from "../../services/client/delete-tweet";
export function TweetView({ tweet = {}, detailed , onDelete }) {
  const [tweetState, setTweetState] = useState(tweet);
  const { data: session, status } = useSession();
  const loading = useLoading();
  const router = useRouter()
  const modal = useModal()

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
      modal.close()
    }
  };

  const editTweet = async(content,image)=>{
    const formData = new FormData()
    formData.append("content",content)
    formData.append("image",image)
    const newPost = await fetch("/api/tweet/"+tweet.id , {method:"PATCH",body:formData})
    const post = await newPost.json()
    modal.close()
    setTweetState(post) 
    console.log(post)
  }

  const comment = () => {
    modal.open(
        <InputModal
          onSubmit={sendComment}
          placeholder="Write your comment"
          user={session.user}
        />
    )
  };

  const onClick=()=>{
     router.push(`/tweet/${tweet.id}`)
  }

  function edit(){
    modal.open(
      <CreatePost content={tweetState.content} img={tweetState.image} submitButton="save" onSubmit={editTweet}/>
    )
  }

  const remove=()=>{
    modal.open(
      <Confirmation subtitle="Do you really want to delete it?" onConfirm={async()=>{
           await deleteTweet(tweetState.id)          
           modal.close()
           onDelete(tweet) 
      }} />
    )
  }

  const onActionClick = (event) => {
    if (status === "authenticated") {
      if (event === "like") {
        like();
      } else if (event === "comment") {
        comment();
      }
      else if(event==="edit"){
        edit()
      } else if(event==="delete"){
        remove()        
      }
    }
  };

  return detailed? <PostDetailedItem post={tweetState} onActionClick={onActionClick} />:<PostListItem post={tweetState} onActionClick={onActionClick} onClick={onClick}/>;
}
