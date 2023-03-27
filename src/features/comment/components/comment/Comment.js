import { ModalContext } from '@/core/layouts/main-layout'
import { Avator } from '@/features/user/components/avatar/Avatar'
import { LoadingBar } from '@/shared/components/loading-bar/LoadingBar'
import { useAutoResizeTextArea } from '@/shared/hooks/useAutoResizeTextArea'
import { useLoading } from '@/shared/hooks/useLoading'
import { useContext, useState } from 'react'
import { postComment } from '../../services/client/post-comment'
import styles from './Comment.module.css'
export function Comment({tweet,onSuccess}){
  const loading = useLoading()
  const [comment,setComment] = useState()
  const commentBox = useAutoResizeTextArea()
  const setModal = useContext(ModalContext)

  const handleComment=async()=>{
    if(comment && tweet){
     loading.start()
     try{
      await postComment({comment,tweetId:tweet.id})
      onSuccess()
     }catch(err){
     
     }
     await loading.complete()
     setModal(undefined) 
    }
  }

  return <div className={styles.createPost}>
      <LoadingBar loading={loading}/>
      <Avator />
      <div className={styles.fields}>
        <textarea
          ref={commentBox}
          placeholder="Write a comment"
          className={styles.textarea}
          value={comment}
          onChange={e=>setComment(e.target.value)}
        ></textarea>
        <div className={styles.actions}>
          <div></div>
          <div>
            <button onClick={handleComment}  className={"btn btn-primary"} style={{padding:'0.7rem 1rem',fontSize:'1rem',width:'100%'}}>
              Comment 
            </button>
          </div>
        </div>
      </div>
    </div>

}
