import { MainLayout } from "@/core/layouts/main-layout";
import { dbConnect } from "@/core/utils/db";
import { getSocket } from "@/core/utils/getSocket";
import { getUsers } from "@/features/user/services/server/get-user.server";
import { CreatePost } from "@/shared/components/create-post/CreatePost";
import { MiniProfile } from "@/shared/components/mini-profile/MiniProfile";
import { useListState } from "@/shared/hooks/useListState";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import styles from "../../styles/Message.module.css";
export async function getServerSideProps(ctx) {
  await dbConnect();
  const users = await getUsers();
  return {
    props: JSON.parse(JSON.stringify({ users: users })),
  };
}

let socket 
export default function Page({ users }) {
  const messages = useListState([]);
  const router = useRouter();
  const { room } = router.query;
  const { data: session } = useSession();

  const socketInitializer = async()=>{
    await fetch("/api/socket");
    socket = getSocket()
    socket.on("newMessage", (msg) => {
      console.log("new message")
      messages.add(JSON.parse(msg).content?.text);
    });
  }

  useEffect(() => {
    socketInitializer()
    return () => {
      socket?.removeAllListeners();
    };
  }, [socket]);

  const sendMessage = (message) => {
    socket?.emit("sendMessage", JSON.stringify({
      content: { text: message },
      receiverId: room,
      senderId: session.user?.id,
    }));
  };

  return (
    <MainLayout>
      <div className={styles.messageContainer}>
        <div className={styles.userList}>
          {users?.map((user) => (
            <Link key={user.id} shallow href={`/message/?room=${user.id}`}>
              <MiniProfile user={user} />{" "}
            </Link>
          ))}
        </div>
        <div className={styles.chatBox}>
          <div>
            {messages.value.map((msg, idx) => (
              <div key={idx}>{msg}</div>
            ))}
          </div>
          <div className={styles.sendMsg}>
            <CreatePost
              submitButton="send"
              placeholder="write your message"
              onSubmit={(e) => sendMessage(e.text)}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
