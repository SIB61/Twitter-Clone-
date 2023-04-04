import { MainLayout } from "@/core/layouts/main-layout";
import { dbConnect } from "@/core/utils/db";
import { TweetList } from "@/features/tweet/components/tweet-list/TweetList";
import { TweetView } from "@/features/tweet/components/tweet-view/TweetView";
import { getTweetById } from "@/features/tweet/services/server/get-tweet-by-id";
import { getUserTweets } from "@/features/tweet/services/server/get-user-tweets";
import { ProfileLayout } from "@/features/user/components/profile-layout/ProfileLayout";
import { getIsFollowing } from "@/features/user/services/server/get-is-following";
import { getUserById } from "@/features/user/services/server/get-user";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { useListState } from "@/shared/hooks/useListState";
import { getNestedLayout } from "@/shared/utils/getNestedLayout";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { getServerSession } from "next-auth";
import { useState } from "react";

export async function getServerSideProps(ctx) {
  try{
  await dbConnect()
  const {userId} = ctx.params
  const {user:myUser} = await getServerSession(ctx.req,ctx.res,authOptions)
  const userPromise =  getUserById(userId)
  const isFollowingPromise =  getIsFollowing({followerId:myUser.id,followedId:userId})
  const tweetsPromise =  getUserTweets(userId)
  return {
    props: JSON.parse(JSON.stringify({
      user:await userPromise,
      tweets:await tweetsPromise,
      isFollowing:await isFollowingPromise
    }))
  };
  }
  catch(err){
    console.log(err)
    return {
      redirect:{
         destination:'/home'
      }
    }
  }
}

function Page({ tweets,user}) {
  const tweetList = useListState(tweets)
  const [parent,_] = useAutoAnimate() 
  return <div ref={parent}>
    {
      tweetList.value.map(tweet=><TweetView key={tweet.id} tweet={tweet} onDelete={tweetList.remove}/>)
    }
  </div>;
}

Page.Layout = getNestedLayout({Parent:MainLayout,Child:ProfileLayout}) 
export default Page;
