import { LoadingBar } from "@/shared/components/loading-bar/LoadingBar";
import { useLoading } from "@/shared/hooks/useLoading";
import { useToggle } from "@/shared/hooks/useToggle";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { PostFollow } from "../../services/client/post-follow";
import { Avator } from "../avatar/Avatar";
import styles from "./ProfileLayout.module.css";
import { EditProfile } from "../edit-profile/EditProfile";
import { useModal } from "@/shared/hooks/useModal";
import { useCustomState } from "@/shared/hooks/useCustomState";
export function ProfileLayout({ user,children }) {
  const userState = useCustomState(user) 
  const [isFollowingState ,toggleIsFollowingState]= useToggle(userState.value.isFollowing)
  console.log(isFollowingState,userState.isFollowing)
  const { data: session, status } = useSession();
  const [selected,setSelected] = useState(1)
  const modal = useModal()
  const router = useRouter()

  useEffect(()=>{
    switch(router.pathname){
      case '/profile/[userId]' : 
        setSelected(1)
      break
      case '/profile/[userId]/followers' : 
        setSelected(2)
      break
      case '/profile/[userId]/followings' : 
        setSelected(3)
      break
      default:
        console.log(router.pathname)

    }
  },[router.pathname])

  const loading = useLoading()
  const follow = async() => {
    loading.start()
    try{
     await PostFollow({followedId:userState.value.id})       
     toggleIsFollowingState()
    }catch(err){
     console.log(err) 
    }
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
                <button className="btn btn-ghost btn-bordered" onClick={follow}>
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
              <Link scroll={false} href={`/profile/${user.id}/`} className={`tab ${selected === 1? 'selected':'' }`}>Tweets</Link>
              <Link scroll={false} href={`/profile/${user.id}/followers`} className={`tab ${selected ===2? 'selected':'' }`}>Followers</Link>
              <Link scroll={false} href={`/profile/${user.id}/followings`} className={`tab ${selected === 3? 'selected':'' }`}>Followings</Link>
            </div>
          </div>
        {children}
        </div>
      </div>
  );
}
