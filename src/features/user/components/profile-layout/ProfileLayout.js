import { LoadingBar } from "@/shared/components/loading-bar/LoadingBar";
import { useLoading } from "@/shared/hooks/useLoading";
import { useToggle } from "@/shared/hooks/useToggle";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Avator } from "../avatar/Avatar";
import styles from "./ProfileLayout.module.css";
import { EditProfile } from "../edit-profile/EditProfile";
import { useModal } from "@/shared/hooks/useModal";
import { useCustomState } from "@/shared/hooks/useCustomState";
import { follow, unfollow } from "../../services/client/follow.client";
export function ProfileLayout({ user,children }) {
  const userState = useCustomState(user) 
  const [isFollowingState ,toggleIsFollowingState]= useToggle(userState.value.isFollowing)
  const { data: session, status } = useSession();
  const [selected,setSelected] = useState(1)
  const modal = useModal()
  const router = useRouter()
  const {page} = router.query
  const loading = useLoading()
  const sendFollow = async() => {
    loading.start()
    const followRes = isFollowingState? await unfollow(user.id): await follow(user.id)
    if(followRes) toggleIsFollowingState()
    loading.complete()
  }

  const editProfile = async()=>{
    modal.open(
         <EditProfile user={userState.value} onComplete={(newUser)=>{
          modal.close()
          userState.set(newUser) 
        }}/>  
    )
  }

  return (
    <div>
      <div className="center-container">
        <div className="appbar">
          {userState.value?.name}</div>
        <div className={styles.loading}>
        <LoadingBar loading={loading.loading}/>
        </div>
        <div className="col">
          <div className={styles.cover}>
            <img src={userState.value?.cover}/>
          </div>
          <div className={styles.profilePic}>
            <div>
              <Avator src={userState.value?.image} size="120" />
            </div>
            {status === "authenticated" &&
              (userState.value.id === session.user.id ? (
                <button onClick={editProfile} className="btn btn-ghost btn-bordered">
                  edit profile
                </button>
              ) : (
                <button className="btn btn-ghost btn-bordered" onClick={sendFollow}>
                  {isFollowingState? 'unfollow' : 'follow' }
                </button>
              ))}
            </div>
          </div>
          <div className={styles.info}>
            <div>{userState.value?.name}</div>
            <div>@{userState.value?.username}</div>
            <div>joined 21 december 2022</div>
            <div className="row" style={{ gap: "1rem" }}>
              <div>{userState.value?.totalFollowers | 0} followers</div>
              <div>{userState.value?.totalFollowings | 0} followings</div>
              <div></div>
            </div>
            <div className="tabbar" style={{ height: "3rem" }}>
              <Link scroll={false} href={`/profile/${user.id}/`} shallow className={`tab ${page===undefined? 'selected':'' }`}>Tweets</Link>
              <Link scroll={false} href={`/profile/${user.id}/?page=followers`} shallow className={`tab ${page==='followers'? 'selected':'' }`}>Followers</Link>
              <Link scroll={false} href={`/profile/${user.id}/?page=followings`} shallow className={`tab ${page === 'followings'? 'selected':'' }`}>Followings</Link>
            </div>
          </div>
        {children}
        </div>
      </div>
  );
}
