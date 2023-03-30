import { PostListItem } from "@/shared/components/post-list-item/PostListItem";
import { CommentView } from "../comment-view/CommentView";
import { useRouter } from "next/router";

export function CommentList({comments}){
  const router = useRouter()
  const onClick=(comment)=>{
    router.push(`/comments/${comment.id}`)
  }
  return <div>
    {
      comments.map((comment)=>(
        <CommentView key={comment.id} onClick={onClick} comment={comment}/>))
    }
  </div>
}
