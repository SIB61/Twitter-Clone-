import { MainLayout } from "@/core/layouts/main-layout";
import CommentModel from "@/core/schemas/comments.schema";
import { CommentList } from "@/features/comment/components/comment-list/CommentList";
import { CommentView } from "@/features/comment/components/comment-view/CommentView";
import { TweetView } from "@/features/tweet/components/tweet-view/TweetView";
import { PostDetailedItem } from "@/shared/components/post-detailed-item/PostDetailedItem";
import { mapId } from "@/shared/utils/mapId";
import { date } from "joi";
import { useRouter } from "next/router";
import { CgArrowLeft } from "react-icons/cg";

export async function getServerSideProps(ctx) {
  const { commentId } = ctx.params;
  const commentPromise = CommentModel.findById(commentId).populate("tweet").lean();
  const repliesPromise = CommentModel.find({ parent: commentId }).lean();
  const [comment, replies] = await Promise.all([
    commentPromise,
    repliesPromise,
  ]);
  return {
    props: {
      data: JSON.parse(
        JSON.stringify({
          key: Date.now(),
          comment: mapId(comment),
          replies: replies.map((reply) => mapId(reply)),
        })
      ),
    },
  };
}

function Page({data:{ comment, replies }}) {
  const router = useRouter()
  return (
    <div>
      <div className="center-container">
        <div className="appbar"><span className="btn btn-icon" onClick={router.back}> <CgArrowLeft/> </span> Comment</div>
        <div style={{ padding: "1rem" }}>
          <TweetView tweet={comment.tweet} detailed/>
          <CommentView  key={comment.id} comment={comment} />
          <div style={{ paddingLeft: "2rem" }}>
            <CommentList comments={replies} />
          </div>
        </div>
      </div>
    </div>
  );
}

Page.Layout = MainLayout;
export default Page;
