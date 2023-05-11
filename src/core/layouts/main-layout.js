import styles from "./main-layout.module.css";
import localFont from "next/font/local";
import { Navbar } from "@/shared/components/navbar/Navbar";
import { Modal } from "@/shared/components/modal/Modal";
import { AuthBottomBar } from "@/features/auth/components/auth-bottom-bar/AuthBottomBar";
import { useRouter } from "next/router";
import { LoginCard } from "@/features/auth/components/login/LoginCard";
import { SignupCard } from "@/features/user/components/signup/SignupCard";
import { AuthCard } from "@/features/auth/components/auth-card/AuthCard";
import { useSession } from "next-auth/react";

const chirp = localFont({
  src: [
    {
      path: "../../../public/fonts/chirp-bold-web.woff",
      weight: "bold",
    },
    {
      path: "../../../public/fonts/chirp-heavy-web.woff",
      weight: "700",
    },
    {
      path: "../../../public/fonts/chirp-medium-web.woff",
      weight: "500",
    },
    {
      path: "../../../public/fonts/chirp-regular-web.woff",
      weight: "normal",
    },
  ],
});

export function MainLayout({ onNewTweet,children }) {
  const router = useRouter();
  const { page } = router.query;
  const {status} = useSession()
  const onClose=() => router.push("/",'',{shallow:true})
  return (
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
