import styles from "./main-layout.module.css";
import localFont from "next/font/local";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Navbar } from "@/components/common/navbar/Navbar";
import { Modal } from "@/components/common/modal/Modal";
import { SignupCard } from "@/components/user/signup/SignupCard";
import { LoginCard } from "@/components/auth/login/LoginCard";
import { AuthCard } from "@/components/auth/auth-card/AuthCard";
import { AuthBottomBar } from "@/components/auth/auth-bottom-bar/AuthBottomBar";

const chirp = localFont({
  src: [
    {
      path: "../../../../public/fonts/chirp-bold-web.woff",
      weight: "bold",
    },
    {
      path: "../../../../public/fonts/chirp-heavy-web.woff",
      weight: "700",
    },
    {
      path: "../../../../public/fonts/chirp-medium-web.woff",
      weight: "500",
    },
    {
      path: "../../../../public/fonts/chirp-regular-web.woff",
      weight: "normal",
    },
  ],
});

export function MainLayout({ onNewTweet,children }) {
  const router = useRouter();
  const { page } = router.query;
  const {status} = useSession()
  const onClose=() => router.push("/",'',{shallow:true})
  return status === 'loading' ? <div className={styles.main}><div className="loader"></div></div> :
  (
      <main className={styles.main + " " + chirp.className}>
        <aside className={styles.leftBar}>
          <Navbar onNewTweet={onNewTweet} />
        </aside>
        <div className={styles.content}>{children}</div>
        {page === "create-account" && (
          <Modal onClose={onClose}>
            <div style={{ padding: "0 20%" }}>
              <SignupCard />
            </div>
          </Modal>
        )}
        {page === "login" && (
          <Modal onClose={onClose}>
            <div style={{ padding: "0 20%" }}>
              <LoginCard />
            </div>
          </Modal>
        )}
        {page === "signup" && (
          <Modal onClose={onClose}>
            <div style={{ padding: "0 10%" }}>
              <AuthCard />
            </div>
          </Modal>
        )}
        {
          status==='unauthenticated' && <AuthBottomBar />
        }
      </main>
  );
}
