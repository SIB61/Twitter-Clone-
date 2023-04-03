import { useState } from "react";
import styles from "./InputModal.module.css";
import { useAutoResizeTextArea } from "@/shared/hooks/useAutoResizeTextArea";
import { Avator } from "@/features/user/components/avatar/Avatar";
import { useToggle } from "@/shared/hooks/useToggle";
import { LoadingBar } from "../loading-bar/LoadingBar";

export function InputModal({
  placeholder,
  onSubmit = () => {},
  user,
  content,
  submitText = "POST",
}) {
  const [value, setValue] = useState(content);
  const autoSizeTextAreaRef = useAutoResizeTextArea(value);
  return (
    <>
      <div className={styles.createPost}>
        {user && <Avator src={user.image} />}
        <div className={styles.fields}>
          <textarea
            ref={autoSizeTextAreaRef}
            placeholder={placeholder}
            className={styles.textarea}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></textarea>
          <div className={styles.actions}>
            <div></div>
            <div>
              <button
                onClick={() => {
                  onSubmit(value);
                }}
                className={"btn btn-primary"}
                style={{
                  padding: "0.7rem 1rem",
                  fontSize: "1rem",
                  width: "100%",
                }}
              >
                {submitText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
