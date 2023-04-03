import { Inter } from "next/font/google";
import styles from "./main-layout.module.css";
import localFont from "next/font/local";
import { Navbar } from "@/shared/components/navbar/Navbar";
import { useToggle } from "@/shared/hooks/useToggle";
import { Modal } from "@/shared/components/modal/Modal";
import { CreateTweet } from "@/features/tweet/components/create-tweet/CreateTweet";
import { createContext, useState } from "react";
import { AuthBottomBar } from "@/features/auth/components/auth-bottom-bar/AuthBottomBar";
import { useRouter } from "next/router";
import { LoginCard } from "@/features/auth/components/login/LoginCard";
import { SignupCard } from "@/features/user/components/signup/SignupCard";
import { AuthCard } from "@/features/auth/components/auth-card/AuthCard";
import { useSession } from "next-auth/react";
const inter = Inter({ subsets: ["latin"] });

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

export function MainLayout({ children }) {
  const router = useRouter();
  const { page } = router.query;
  const {status} = useSession()
  const onClose=() => router.push("/",'',{shallow:true})
  return (
      <main className={styles.main + " " + chirp.className}>
        <aside className={styles.leftBar}>
          <Navbar />
        </aside>
        <div className={styles.content}>{children}</div>
        {page === "create-tweet" && (
          <Modal onClose={onClose}>
            <CreateTweet expanded />
          </Modal>
        )}
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
