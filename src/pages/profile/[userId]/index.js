
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
  const user = await getUserById(userId)
  const isFollowing = await getIsFollowing({followerId:myUser.id,followedId:user.id})
  user.isFollowing = isFollowing
  const tweets = await getUserTweets(userId)
  return {
    props: {
      user:JSON.parse(JSON.stringify(user)),
      tweets:JSON.parse(JSON.stringify(tweets))
    },
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

function Page({ user,tweets }) {
  console.log(tweets)
  return <div>
    <TweetList tweets={tweets}/>
  </div>;
}

Page.Layout = getNestedLayout({Parent:MainLayout,Child:ProfileLayout}) 
export default Page;
