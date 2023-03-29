import { MainLayout } from "@/core/layouts/main-layout";
import { dbConnect } from "@/core/utils/db";
import { TweetList } from "@/features/tweet/components/tweet-list/TweetList";
import { getTweetById } from "@/features/tweet/services/server/get-tweet-by-id";
import { getUserTweets } from "@/features/tweet/services/server/get-user-tweets";
import { ProfileLayout } from "@/features/user/components/profile-layout/ProfileLayout";
import { getFollowers } from "@/features/user/services/server/get-followers";
import { getIsFollowing } from "@/features/user/services/server/get-is-following";
import { getUserById } from "@/features/user/services/server/get-user";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import tweet from "@/pages/api/tweet";
import follow from "@/pages/api/user/[userId]/follow";
import { MiniProfile } from "@/shared/components/mini-profile/MiniProfile";
import { UserList } from "@/shared/components/user-list/UserList";
import { getNestedLayout } from "@/shared/utils/getNestedLayout";
import { getServerSession } from "next-auth";
import Link from "next/link";

export async function getServerSideProps(ctx) {
  try{
  await dbConnect()
  const {userId} = ctx.params
  const {user:myUser} = await getServerSession(ctx.req,ctx.res,authOptions)
  const user = await getUserById(userId)
  const isFollowing = await getIsFollowing({followerId:myUser.id,followedId:user.id})
  user.isFollowing = isFollowing
  const followers = await getFollowers(userId)
  return {
    props: {
      user:JSON.parse(JSON.stringify(user)),
      followers:JSON.parse(JSON.stringify(followers))
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

function Page({ user,followers }) {
  return <div style={{padding:'1rem'}}>
    <UserList users={followers}/>
  </div>
}

Page.Layout = getNestedLayout({Parent:MainLayout,Child:ProfileLayout}) 
export default Page;
