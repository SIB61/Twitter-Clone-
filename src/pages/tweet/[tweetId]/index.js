import { MainLayout } from "@/core/layouts/main-layout";
import { TweetView } from "@/features/tweet/components/tweet-view/TweetView";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { useListState } from "@/shared/hooks/useListState";
import { CommentView } from "@/features/comment/components/comment-view/CommentView";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { getTweetById } from "@/features/tweet/services/server/get-tweet.server";
import { createOptions } from "@/pages/api/auth/[...nextauth]";
export async function getServerSideProps(ctx) {
  const { tweetId } = ctx.params;
  try {
    const { user } = await getServerSession(ctx.req, ctx.res, createOptions(ctx.req));
    const tweet = await getTweetById(tweetId);
    tweet.isLiked = tweet.likes.reduce((acc,cur)=>acc||cur.toString()===user.id.toString(),false)
    return {
      props: {
        tweet: JSON.parse(JSON.stringify(tweet)),
      },
    };
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        destination: "/home",
        permanent: true,
      },
    };
  }
}

function Page({ tweet }) {
  const router = useRouter();
  const onDelete = () => {
    router.back();
  };
  const [parent, _] = useAutoAnimate();

  const comments = useListState(tweet.replies);

  return (
    <MainLayout>
      {
      <div>
        <div className="center-container">
          <div className="appbar">Tweet</div>
          <div style={{ padding: "1rem" }}>
            <TweetView
              onComment={comments.add}
              onDelete={onDelete}
              detailed
              tweet={tweet}
            />
            <div ref={parent}>
              {comments.value.map((comment) => (
                <CommentView
                  onDelete={comments.remove}
                  onClick={() => router.push(`/comments/${comment.id}`)}
                  comment={comment}
                  key={comment.id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      }
    </MainLayout>
  );
}

export default Page;


