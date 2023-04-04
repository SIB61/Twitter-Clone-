import { MainLayout } from "@/core/layouts/main-layout";
import { dbConnect } from "@/core/utils/db";
import { ProfileLayout } from "@/features/user/components/profile-layout/ProfileLayout";
import { getFollowers } from "@/features/user/services/server/get-followers";
import { getIsFollowing } from "@/features/user/services/server/get-is-following";
import { getUserById } from "@/features/user/services/server/get-user";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { MiniProfile } from "@/shared/components/mini-profile/MiniProfile";
import { getServerSession } from "next-auth";

export async function getServerSideProps(ctx) {
  try {
    await dbConnect();
    const { userId } = ctx.params;
    const { user: myUser } = await getServerSession(
      ctx.req,
      ctx.res,
      authOptions
    );
    const user = getUserById(userId);
    const isFollowing = getIsFollowing({
      followerId: myUser.id,
      followedId: userId,
    });
    const followers = getFollowers(userId);
    let [userRes, isFollowingRes, followersRes] = await Promise.all([
      user,
      isFollowing,
      followers,
    ]);
    userRes.isFollowing = isFollowingRes
    return {
      props: JSON.parse(
        JSON.stringify({
          user: userRes,
          followers: followersRes,
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

function Page({ followers,user }) {
  return (
    <MainLayout>
      <ProfileLayout user={user}>
        <div style={{ padding: "1rem" }}>
          {followers.map((follower) => (
            <MiniProfile
              user={follower}
              key={follower.id}
              action={<button className="btn btn-primary">unfollow</button>}
            />
          ))}
        </div>
      </ProfileLayout>
    </MainLayout>
  );
}

export default Page;
