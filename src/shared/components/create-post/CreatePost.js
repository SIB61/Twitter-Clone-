import { useLoading } from "@/shared/hooks/useLoading";
import styles from "./CreatePost.module.css";
import { LoadingBar } from "../loading-bar/LoadingBar";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useAutoResizeTextArea } from "@/shared/hooks/useAutoResizeTextArea";
import { FileInput } from "../file-reader/FileReader";
import { ImgIcon } from "../icons/ImgIcon";
import { RxCross1 } from "react-icons/rx";
import { Avator } from "@/features/user/components/avatar/Avatar";
export function CreatePost({
  content,
  img,
  onSubmit = () => {},
  submitButton = "tweet",
}) {
  const {
    data: { user },
  } = useSession();
  const loading = useLoading();
  const [image, setImage] = useState({ src: img });
  const [post, setPost] = useState(content);
  const textAreaRef = useAutoResizeTextArea(post);
  return (
    <div className={styles.createPost}>
      <LoadingBar loading={loading.loading} />
      <Avator src={user.image} size="48" />
      <div className={styles.fields}>
        <textarea
          ref={textAreaRef}
          placeholder="What's happening"
          className={styles.textarea}
          value={post}
          onChange={(e) => setPost(e.target.value)}
        ></textarea>
        {image.src && (
          <div className={styles.image}>
            <img src={image.src} alt="img" />
            <button
              onClick={() => setImage(undefined)}
              className={`btn btn-ghost`}
            >
              <RxCross1 />
            </button>
          </div>
        )}
        <div className={styles.actions}>
          <div className={styles.attachment}>
            <FileInput onSelect={(e) => setImage(e)}>
              <div className="btn btn-icon">
                <ImgIcon color="rgb(29, 155, 240)" width="22" />
              </div>
            </FileInput>
          </div>
          <div>
            <button
              onClick={() => {
                onSubmit(post, image?.file);
              }}
              className={"btn btn-primary"}
              style={{ padding: "0.7rem 1rem", fontSize: "1rem" }}
            >
              {submitButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
