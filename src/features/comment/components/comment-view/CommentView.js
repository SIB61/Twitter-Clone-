import { ModalContext } from "@/core/layouts/main-layout";
import { InputModal } from "@/shared/components/input-modal/InputModal";
import { Modal } from "@/shared/components/modal/Modal";
import { PostListItem } from "@/shared/components/post-list-item/PostListItem";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { postReply } from "../../services/client/post-reply";
import { useLoading } from "@/shared/hooks/useLoading";
import { useModal } from "@/shared/hooks/useModal";

export function CommentView({comment,onClick}){

  const { data: session, status } = useSession();
  const loading = useLoading();
  const modal = useModal()
  const router = useRouter()
  const [commentState,setCommentState] = useState(comment)
  useEffect(()=>{console.log(loading.loading)},[loading.loading])
  const sendReply = async (value) => {
    if (value)
    {
      loading.start()
      try {
        await postReply({ content: value, commentId: comment.id, tweetId: comment.tweet });
        setCommentState(state=>({...state,totalReplies:state.totalReplies+1}))
        } catch (err) {
        console.log(err)
      }
      await loading.complete()
      modal.close()
      router.replace(router.asPath)
    }
  };

  async function reply(){
    modal.open(
        <InputModal
          onSubmit={sendReply}
          placeholder="Write your reply"
          user={session.user}
        />
    )
  };

  const onActionClick = (event) => {
    if(event === 'comment'){
       reply()  
    } else if(event === 'like'){
    }
  }


  if(!onClick){
  onClick=(comment)=>{
    router.push(`/comments/${comment.id}`)
  }
  }


  return <div>
    <PostListItem onClick={()=>onClick(comment)} post={commentState} onActionClick={onActionClick}/>
  </div>

}
