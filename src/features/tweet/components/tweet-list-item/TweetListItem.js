import { PostListItem } from "@/shared/components/post-list-item/PostListItem";
import { useRouter } from "next/router";

export function TweetListItem({tweet={}}){
  const router = useRouter()
  const onClick=()=>{
     router.push(`/tweet/${tweet.id}`)
  }
  const onActionClick=(event)=>{
    if(event==='like') {

    }else if(event === 'comment'){
      
    }
  }
  return <PostListItem post={tweet} onClick={onClick} onActionClick={onActionClick} />
}
