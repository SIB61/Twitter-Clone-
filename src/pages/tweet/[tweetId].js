import { MainLayout } from "@/core/layouts/main-layout"
import { getTweetById } from "@/features/tweet/services/server/get-tweet"
import { defaults } from "joi"
export async function getServerSideProps(ctx){
  const {tweetId} = ctx.params    
  try{
    const tweet = await getTweetById(tweetId)
   return {
     props:{
        tweet:JSON.parse(JSON.stringify(tweet))
     }
   }
  }catch(err){
    return {
      redirect:{
        destination:'/home',
        permanent:true
      }
    } 
  }
}

function Page({tweet}){
  return <div>{tweet.post}</div> 
}

Page.Layout = MainLayout
export default Page


