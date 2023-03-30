
import { MainLayout } from "@/core/layouts/main-layout";
import { dbConnect } from "@/core/utils/db";
import { TweetList } from "@/features/tweet/components/tweet-list/TweetList";
import { getTweetById } from "@/features/tweet/services/server/get-tweet-by-id";
import { getUserTweets } from "@/features/tweet/services/server/get-user-tweets";
import { ProfileLayout } from "@/features/user/components/profile-layout/ProfileLayout";
import { getIsFollowing } from "@/features/user/services/server/get-is-following";
import { getUserById } from "@/features/user/services/server/get-user";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import tweet from "@/pages/api/tweet";
import { getNestedLayout } from "@/shared/utils/getNestedLayout";
import { getServerSession } from "next-auth";

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

function Page({ tweets}) {
  console.log(tweets)
  return <div>
    <TweetList tweets={tweets}/>
  </div>;
}

Page.Layout = getNestedLayout({Parent:MainLayout,Child:ProfileLayout}) 
export default Page;
