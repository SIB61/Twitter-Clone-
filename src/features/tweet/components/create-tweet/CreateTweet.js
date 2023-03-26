import { Avator } from "@/features/user/components/avatar/Avatar";
import styles from "./CreateTweet.module.css";
import { ImgIcon } from "@/shared/components/icons/ImgIcon";
import Dp from "public/images/dp.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLoading } from "@/shared/hooks/useLoading";
import { LoadingBar } from "@/shared/components/loading-bar/LoadingBar";
import { useAutoResizeTextArea } from "@/shared/hooks/useAutoResizeTextArea";
import { useRouter } from "next/router";
export function CreateTweet({ expanded }) {
  const [expand,setExpand] = useState(expanded)
  const [post,setPost] = useState() 
  const textAreaRef = useAutoResizeTextArea(post)
  const loading = useLoading()
  const [img,setImg] = useState()
  const router = useRouter()
  const twitPost = async () => {
    if(post) {
      loading.start()
      await axios.post('/api/tweet',{post:post,imgUrl:null})
      setPost("")
      loading.complete()
    }
  }


  const onImgSelect = (e) =>{
    const file = e.target.files[0] 
    const fileReader = new FileReader()
    fileReader.onload = (e) => {
       setImg(e.target.result) 
    }
    fileReader.readAsDataURL(file)
  }

  return (
    <div className={styles.createPost}>
      <LoadingBar loading={loading}/>
      <Avator src={Dp} size="48" />
      <div className={styles.fields}>
        {expand && (
          <select defaultValue="everyone" className={styles.audience}>
            <option>Everyone</option>
          </select>
        )}
        <textarea
          ref={textAreaRef}
          placeholder="What's happening"
          className={styles.textarea}
          onClick={()=>{
            if(!expand){
              setExpand(true)
            }
          }}
          value={post}
          onChange={e=>setPost(e.target.value)}
        ></textarea>
        {
          img && (<img src={img} style={{borderRadius:'20px',marginBottom:'10px'}} />)
        }
        {expand && (
          <>
            <select defaultValue="everyone" className={styles.audience} style={{border:'none',marginLeft:'0'}}>
              <option value="everyone">Everyone can reply</option>
            </select>
            <div className="h-divider"></div>
          </>
        )}
        <div className={styles.actions}>
          <div className={styles.attachment}>
            <label for="img" className="btn btn-icon" style={{padding:'0.5rem'}}>
              <ImgIcon color="rgb(29, 155, 240)" width="1.4rem" />
            </label>
            <input id="img" accept="image/*" onChange={onImgSelect} type="file"/>
          </div>
          <div>
            <button onClick={twitPost} className={"btn btn-primary"} style={{padding:'0.7rem 1rem',fontSize:'1rem'}}>
              Tweet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
