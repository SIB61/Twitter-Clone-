import { PostListItem } from "@/shared/components/post-list-item/PostListItem";
import { CommentView } from "../comment-view/CommentView";

export function CommentList({comments}){
  return <div>
    {
      comments.map((comment,index)=>(<CommentView comment={comment}/>))
    }
  </div>
}
