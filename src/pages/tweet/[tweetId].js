import { MainLayout } from "@/core/layouts/main-layout"
import { TweetView } from "@/features/tweet/components/tweet-view/TweetView"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]"
import { getIsLiked } from "@/features/tweet/services/server/get-is-liked"
import { getTweetById } from "@/features/tweet/services/server/get-tweet-by-id"
import { CommentList } from "@/features/comment/components/comment-list/CommentList"
import comment from "../api/tweet/[tweetId]/comment"
export async function getServerSideProps(ctx){
  const {tweetId} = ctx.params    
  try{
    const tweet = await getTweetById(tweetId)
    const {user} = await getServerSession(ctx.req,ctx.res,authOptions)
    const isLiked = await getIsLiked({tweetId,userId:user.id})
    tweet.isLiked = isLiked
    return {
     props:{
        tweet:JSON.parse(JSON.stringify(tweet))
     }
   }
  }catch(err){
    console.log(err)
    return {
      redirect:{
        destination:'/home',
        permanent:true
      }
    } 
  }
}

function Page({tweet}){
  return <div>
    <div className="center-container" >
    <div className="appbar">Tweet</div>
      <div style={{padding:'1rem'}}>
        <TweetView detailed tweet={tweet}/>    
        <CommentList comments={tweet.comments}/>
      </div>
    </div>
  </div> 
}

Page.Layout = MainLayout
export default Page


