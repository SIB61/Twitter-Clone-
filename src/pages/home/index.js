import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { MainLayout } from "@/core/layouts/main-layout";
import { CreateTweet } from "@/features/tweet/components/create-tweet/CreateTweet";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { getUserFeed } from "@/features/tweet/services/server/get-feed";
import { YouMayKnow } from "@/features/user/components/you-may-know/YouMayKnow";
import { getUsers } from "@/features/user/services/server/get-user";
import { TweetView } from "@/features/tweet/components/tweet-view/TweetView";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useListState } from "@/shared/hooks/useListState";
import { getAllTweets } from "@/features/tweet/services/server/get-all-tweets";

export async function getServerSideProps(ctx) {
  const { user } = await getServerSession(ctx.req, ctx.res, authOptions);
  const tweetsPromise = getAllTweets();
  const usersPromise = getUsers();
  const [tweets, users] = await Promise.all([tweetsPromise, usersPromise]);
  console.log(tweets)
  return {
    props: JSON.parse(
      JSON.stringify({
        tweets: tweets,
        users: users.filter((u) => u.id != user.id),
      })
    ),
  };
}

function Page({ tweets, users }) {
  const { data, status } = useSession();
  const tweetList = useListState(tweets);
  const [parent, _] = useAutoAnimate();

  console.log(status, data);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout onNewTweet={tweetList.add}>
        <div className={styles.home}>
          <div className="center-container">
            <div className="appbar">Home</div>
            <div className="content">
              <CreateTweet
                onComplete={(tweet) => {
                  if (tweet) tweetList.add(tweet);
                }}
              />
              <div ref={parent}>
                {tweetList.value.map((tweet) => (
                  <TweetView
                    tweet={tweet}
                    key={tweet.id}
                    onDelete={tweetList.remove}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className={styles.rightBar}>
            <YouMayKnow users={users} />
          </div>
        </div>
      </MainLayout>
    </>
  );
}
export default Page;
