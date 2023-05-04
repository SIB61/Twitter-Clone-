import { LoadingBar } from "@/shared/components/loading-bar/LoadingBar";
import { useLoading } from "@/shared/hooks/useLoading";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Avator } from "../avatar/Avatar";
import styles from "./ProfileLayout.module.css";
import { EditProfile } from "../edit-profile/EditProfile";
import { useModal } from "@/shared/hooks/useModal";
import { AsyncButton } from "@/shared/components/async-button/AsyncButton";
import { userActions, useUserReducer } from "../../actions/user.action";
export function ProfileLayout({ user, children }) {
  const [userState, dispatch] = useUserReducer(user);
  const { data: session, status } = useSession();
  const modal = useModal();
  const router = useRouter();
  const { page } = router.query;
  const loading = useLoading();
  const sendFollow = async () => {
    await dispatch({ type: userActions.TOGGLE_FOLLOW });
  };

  const editProfile = async () => {
    modal.open(<EditProfile user={userState} dispatch={dispatch} />);
  };

  return (
    <div>
      <div className="center-container">
        <div className="appbar">{userState?.name}</div>
        <div className={styles.loading}>
          <LoadingBar loading={loading.loading} />
        </div>
        <div className="col">
          <div className={styles.cover}>
            <img src={userState?.cover} />
          </div>
          <div className={styles.profilePic}>
            <div>
              <Avator src={userState?.image} size="120" />
            </div>
            {status === "authenticated" &&
              (userState?.id === session.user.id ? (
                <button
                  onClick={editProfile}
                  className="btn btn-ghost btn-bordered"
                >
                  edit profile
                </button>
              ) : (
                <AsyncButton
                  className="btn btn-ghost btn-bordered"
                  onClickAsync={sendFollow}
                >
                  {userState?.isFollowing ? "unfollow" : "follow"}
                </AsyncButton>
              ))}
          </div>
        </div>
        <div className={styles.info}>
          <div>{userState?.name}</div>
          <div>@{userState?.username}</div>
          <div>joined 21 december 2022</div>
          <div className="row" style={{ gap: "1rem" }}>
            <div>{userState?.totalFollowers | 0} followers</div>
            <div>{userState?.totalFollowings | 0} followings</div>
            <div></div>
          </div>
          <div className="tabbar" style={{ height: "3rem" }}>
            <Link
              scroll={false}
              href={`/profile/${user.id}/`}
              shallow
              className={`tab ${page === undefined ? "selected" : ""}`}
            >
              Tweets
            </Link>
            <Link
              scroll={false}
              href={`/profile/${user.id}/?page=followers`}
              shallow
              className={`tab ${page === "followers" ? "selected" : ""}`}
            >
              Followers
            </Link>
            <Link
              scroll={false}
              href={`/profile/${user.id}/?page=followings`}
              shallow
              className={`tab ${page === "followings" ? "selected" : ""}`}
            >
              Followings
            </Link>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
