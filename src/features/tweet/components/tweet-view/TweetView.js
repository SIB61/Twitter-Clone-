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
export function TweetView({ tweet = {}, detailed , onDelete=()=>{}, onComment=()=>{} }) {
  const [tweetState, setTweetState] = useState(tweet)
  const { data: session, status } = useSession();
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
      await axios.post("/api/like",{tweetId:tweetState.id});

    } catch (err) {
      console.log(err);
    }
  };

  const sendComment = async (value) => {
    if (value)
    {
      modal.startLoading()
      try {
        const form = new FormData()
        form.append('parent',tweetState.id)
        form.append('content',value)
        form.append('type','reply')
        const newCommentRes = await fetch('/api/tweet',{body:form,method:'POST'})
        const newComment = await newCommentRes.json()
        onComment(newComment) 
        setTweetState(state=>({...state,totalComments:state.totalComments+1}))
        } catch (err) {
        console.log(err)
      }
      modal.close()
    }
  };

  const editTweet = async({text,image})=>{
    
    modal.startLoading()
    const formData = new FormData()
    formData.append("content",text)
    formData.append("image",image?.file)
    formData.append("imageUrl",image?.src)
    console.log(image,tweetState.content.image)
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
      <CreatePost content={tweetState.content.text} img={tweetState.content.image} submitButton="save" onSubmit={editTweet}/>
    )
  }

  const remove=()=>{
    modal.open(
      <Confirmation subtitle="Do you really want to delete it?" onConfirm={async()=>{
           modal.startLoading()
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
