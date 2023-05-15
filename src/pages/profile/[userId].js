import { useAutoAnimate } from "@formkit/auto-animate/react";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { createOptions } from "../api/auth/[...nextauth]";
import { dbConnect } from "@/lib/helpers/db";
import { getProfile } from "@/lib/services/user/get-profile.server";
import { useListState } from "@/hooks/useListState";
import { MainLayout } from "@/components/layouts/main-layout/main-layout";
import { ProfileLayout } from "@/components/user/profile-layout/ProfileLayout";
import { TweetView } from "@/components/tweet/tweet-view/TweetView";
import { MiniProfile } from "@/components/common/mini-profile/MiniProfile";
import Link from "next/link";

export async function getServerSideProps(ctx) {
  try {
    await dbConnect();
    const { userId } = ctx.params;
    console.log("this is a profile id ",userId)
    const { user } = await getServerSession(
      ctx.req,
      ctx.res,
      createOptions(ctx.req)
    );
    let profile;
    // if (page === "followers") {
    //   profile = await getProfileWithFollowers(userId);
    // } else if (page === "followings") {
    //   profile = await getProfileWithFollowings(userId);
    // } else {
    //   profile = await getProfileWithTweets(userId);
    // }
    profile = await getProfile(userId,user)
    console.log("adslk")

    return {
      props: JSON.parse(
        JSON.stringify({
          profile,
        })
      ),
    };
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        destination: "/home",
      },
    };
  }
}

function Page({ profile }) {
  const tweets = useListState(profile.tweets);
  const followers = useListState(profile.followers);
  const followings = useListState(profile.followings);
  const [parent, _] = useAutoAnimate();
  const router = useRouter()
  const { page } = router.query;
  return (
    <MainLayout onNewTweet={tweets.add}>
      <ProfileLayout user={profile}>
        <div ref={parent}>
          {page === undefined &&
            tweets.value.map((tweet) => (
              <TweetView
                onDelete={tweets.remove}
                tweet={tweet}
                key={tweet.id}
              />
            ))}

          {page === "followers" &&
            followers.value.map((follower) => (
              <Link className="col" style={{margin:'1rem'}} href={follower.id}  key={follower.id}>
              <MiniProfile user={follower} />
              </Link>
            ))}

          {page === "followings" &&
            followings.value.map((following) => (
              <Link className="col" style={{margin:'1rem'}} href={following.id}  key={following.id}>
              <MiniProfile user={following} key={following.id} />
              </Link>
            ))}
        </div>
      </ProfileLayout>
    </MainLayout>
  );
}

export default Page;
