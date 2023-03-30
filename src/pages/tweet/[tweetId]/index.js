import { MainLayout } from "@/core/layouts/main-layout"
import { TweetView } from "@/features/tweet/components/tweet-view/TweetView"
import { getServerSession } from "next-auth"
import { getIsLiked } from "@/features/tweet/services/server/get-is-liked"
import { getTweetById } from "@/features/tweet/services/server/get-tweet-by-id"
import { CommentList } from "@/features/comment/components/comment-list/CommentList"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
export async function getServerSideProps(ctx){
  const {tweetId} = ctx.params    
  try{
    const {user} = await getServerSession(ctx.req,ctx.res,authOptions)
    const tweetPromise =  getTweetById(tweetId)
    const isLikedPromise =  getIsLiked({tweetId,userId:user.id})
    const [tweet,isLiked] = await Promise.all([tweetPromise,isLikedPromise])
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


