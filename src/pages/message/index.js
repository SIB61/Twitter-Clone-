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
import { useMessage } from "@/shared/hooks/useMessages";
import { TbSettings } from "react-icons/tb";
import { MdOutlineForward, MdOutlineForwardToInbox } from "react-icons/md";
import { Input } from "@/shared/components/input/Input";
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
    const receiverId = room;
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
      JSON.stringify({
        users: users,
        previousMessages: messages,
        receiver: receiver,
      })
    ),
  };
}

export default function Page({ users, previousMessages, receiver }) {
  const router = useRouter();
  const { room } = router.query;
  const { data: session } = useSession();
  const { messages, messageNotifications, sendMessage } = useMessage();

  useEffect(() => {
    console.log(previousMessages);
    if (receiver?.id) {
      messages.set((curr) => {
        if (!curr[receiver.id]) {
          curr[receiver.id] = previousMessages;
        }
        return { ...curr };
      });
    }
  }, []);

  useEffect(() => {
    messageNotifications.set((value) => {
      value?.delete(receiver?.id);
      return value;
    });
  }, [messages]);

  const postMessage = (message) => {
    const newMessage = {
      content: { text: message },
      sender: session.user.id,
      receiver: room,
    };
    sendMessage(newMessage);
  };

  return (
    <MainLayout>
      <div className={styles.messageContainer}>
        <div className={styles.userList}>
          <div className={styles.userBoxHeader}>
            <div className={styles.userBoxHeaderOptionsAndText}>
              <h4>Messages</h4>
              <span className={styles.userBoxSettingsOption}>
                <TbSettings />
              </span>
              <span>
                <MdOutlineForwardToInbox />
              </span>
            </div>
            <div>
              <Input placeHolder={"Search Direct Messages"} />
            </div>
          </div>
          {users?.map((user) => (
            <div className={styles.user}>
              <Link
                style={{ position: "relative" }}
                key={user.id}
                href={`/message/?room=${user.id}`}
              >
                <MiniProfile user={user} />{" "}
                {messageNotifications.value.has(user.id) && (
                  <span className="notification-badge"></span>
                )}
              </Link>
            </div>
          ))}
        </div>

        {receiver ? (
          <div className={styles.chatBox}>
            <div className={styles.receiver}>
              <MiniProfile user={receiver} />
            </div>
            <div>
              {messages?.value[receiver.id]?.map((msg, idx) => (
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
                onSubmit={(e) => postMessage(e.text)}
              />
            </div>
          </div>
        ) : (
          <div className={styles.empty}>
            <h1>Select a Message</h1>
            <p>
              Choose from your existing conversations, start a new one, or just
              keep swimming.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
