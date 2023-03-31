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
import { ModalContext } from "@/core/layouts/main-layout";
import { Modal } from "@/shared/components/modal/Modal";
import { EditProfile } from "../edit-profile/EditProfile";
export function ProfileLayout({ children }) {
  const [user,setUser] = useState(children.props.user);
  user.isFollowing = children.props.isFollowing
  const [isFollowingState ,toggleIsFollowingState]= useToggle(user.isFollowing)
  const { data: session, status } = useSession();
  const [selected,setSelected] = useState(1)
  const setModal = useContext(ModalContext)
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
     await PostFollow({followedId:user.id})       
     toggleIsFollowingState()
    }catch(err){
     console.log(err) 
    }
    loading.complete()
  }

  const editProfile = async()=>{
    setModal(
      <Modal>
         <EditProfile user={user} onComplete={(newUser)=>{
          setModal(undefined)
          setUser(newUser)
        }}/>  
      </Modal>
    ) 
  }

  return (
    <div>
      <div className="center-container">
        <div className="appbar">
          {user?.name}</div>
        <div className={styles.loading}>
        <LoadingBar loading={loading.loading}/>
        </div>
        <div className="col">
          <div className={styles.cover}>
            <img src={user.cover}/>
          </div>
          <div className={styles.profilePic}>
            <div>
              <Avator src={user?.image} size="120" />
            </div>
            {status === "authenticated" &&
              (user.id === session.user.id ? (
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
            <div>{user?.name}</div>
            <div>@{user?.username}</div>
            <div>joined 21 december 2022</div>
            <div className="row" style={{ gap: "1rem" }}>
              <div>{user?.totalFollowers | 0} followers</div>
              <div>{user?.totalFollowings | 0} followings</div>
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
