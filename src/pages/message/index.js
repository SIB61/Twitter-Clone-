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
import { use, useEffect, useMemo } from "react";
import styles from "../../styles/Message.module.css";
import { getAllConversationsForUser } from "@/features/conversation/services/server/getConversation";
import { getServerSession } from "next-auth";
import { createOptions } from "../api/auth/[...nextauth]";
export async function getServerSideProps(ctx) {
  await dbConnect();
  const { user } = await getServerSession(
    ctx.req,
    ctx.res,
    createOptions(ctx.req)
  );

  let users = await getUsers();
  users = users.filter((u) => u.id.toString() !== user.id.toString());

  const { room } = ctx.query;
  let messages = [];
  let receiver;
  if (room) {
    const receiverId = room.split("-")[1];
    receiver = users.reduce(
      (acc, cur) => (cur.id.toString() === receiverId ? cur : acc),
      undefined
    );
    messages = await getAllConversationsForUser({
      userId: user.id,
      receiverID: receiverId,
    });
    messages.reverse();
  }
  return {
    props: JSON.parse(
      JSON.stringify({ users: users, messages: messages, receiver: receiver })
    ),
  };
}

let socket;
export default function Page({ users, messages, receiver }) {
  const messageList = useListState(messages);
  const router = useRouter();
  const { room } = router.query;
  const { data: session } = useSession();

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = getSocket();
    socket.on("connect", () => {
      socket.emit("join", room);
    });
    socket.on("newMessage", (msg) => {
      console.log("new message");
      messageList.add(msg);
    });
  };

  useEffect(() => {
    socketInitializer();
    return () => {
      socket?.removeAllListeners();
    };
  }, [socket]);

  const sendMessage = (message) => {
    const [senderId, receiverId] = room.split("-");
    const newMessage = {
      content: { text: message },
      sender: senderId,
      receiver: receiverId,
    };
    messageList.add(newMessage);
    socket?.emit("sendMessage", newMessage);
  };

  return (
    <MainLayout>
      <div className={styles.messageContainer}>
        <div className={styles.userList}>
          {users?.map((user) => (
            <div>

            <Link
              key={user.id}
              href={`/message/?room=${session?.user.id}-${user.id}`}
            >
              <MiniProfile user={user} />{" "}
            </Link>
             
            </div>
          ))}


        </div>

        {receiver && (
          <div className={styles.chatBox}>
            <div className={styles.receiver}>
              <MiniProfile user={receiver} />
            </div>
            <div>
              {messageList.value.map((msg, idx) => (
                <>
                  {session?.user.id === msg.sender ? (
                    <div key={idx} className={`${styles.msg} ${styles.myMsg}`}>
                      {msg.content.text}
                    </div>
                  ) : (
                    <div
                      key={idx}
                      className={`${styles.msg} ${styles.otherMsg}`}
                    >
                      {msg.content.text}
                    </div>
                  )}
                </>
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
        )}
      </div>
    </MainLayout>
  );
}
