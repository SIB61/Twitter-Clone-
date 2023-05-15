import { dbConnect } from "@/lib/helpers/db";
import { getServerSession } from "next-auth";
import { createOptions } from "../api/auth/[...nextauth]";
import { getUsers } from "@/lib/services/user/get-user.server";
import { deleteMessageNotification } from "@/lib/services/notification/delete-message-notification.server";
import { getAllConversationsByUser } from "@/lib/services/conversation/get-conversation.server";
import { MESSAGE_SEEN } from "@/constants";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useMessages } from "@/hooks/useMessages";
import { useEffect, useRef } from "react";
import {TbSettings} from 'react-icons/tb'
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { MessageActions } from "@/actions/message.action";
import { MdOutlineForwardToInbox } from 'react-icons/md'
import { MiniProfile } from "@/components/common/mini-profile/MiniProfile";
import { MessageBubble } from "@/components/conversation/MessageBubble";
import { CreatePost } from "@/components/common/create-post/CreatePost";
import { MainLayout } from "@/components/layouts/main-layout/main-layout";
import styles from "../../styles/Message.module.css"
import { Input } from "@/components/common/input/Input";
import Link from "next/link";
import { debounce } from "@/utils/debounce";
export async function getServerSideProps(ctx) {
  await dbConnect();
  const { user } = await getServerSession(
    ctx.req,
    ctx.res,
    createOptions(ctx.req)
  );
  const { room } = ctx.query;
  let receiver;
  let users = getUsers().then((result) => {
    result = result.filter((u) => u.id.toString() !== user.id.toString());
    if (room) {
      receiver = result.reduce(
        (acc, cur) => (cur.id.toString() === room ? cur : acc),
        undefined
      );
    }
    return Promise.resolve(result);
  });
  let messages = Promise.resolve([]);
  if (room) {
    const receiverId = room;
    deleteMessageNotification({
      userId: user.id,
      notificationSenderId: receiverId,
    });
    messages = getAllConversationsByUser({
      userId: user.id,
      receiverID: receiverId,
      pageIndex: 1,
      pageSize: 50,
    });
  }

  const [usersResult, messagesResult] = await Promise.all([users, messages]);

  const io = ctx.res.socket.server.io;
  if (io && receiver) {
    io.to(room).emit(MESSAGE_SEEN, { userId: user.id });
  }

  return {
    props: JSON.parse(
      JSON.stringify({
        users: usersResult,
        previousMessages: messagesResult,
        receiver: receiver,
      })
    ),
  };
}

export default function Page({ users, previousMessages, receiver }) {
  const router = useRouter();
  const { room } = router.query;
  const { data: session } = useSession();
  const { messages, messageNotifications, chatUsers, dispatch } = useMessages();
  const loaderRef = useRef();
  const isLoaderOnScreen = !!useIntersectionObserver(loaderRef, {})
    ?.isIntersecting;

  useEffect(() => {
    if (isLoaderOnScreen) {
      console.log("loader on screen")
      dispatch(MessageActions.FETCH_USER_MESSAGES, { userId: receiver.id });
    }
  }, [isLoaderOnScreen]);

  useEffect(() => {
    (async () => {
      if (receiver?.id) {
        await dispatch(MessageActions.SET_USER_MESSAGES, {
          userId: receiver.id,
          messages: previousMessages,
        });
      }
      await dispatch(MessageActions.SET_USERS, users);
    })();
  }, []);

  const postMessage = ({ text }) => {
    if (text) {
      dispatch(MessageActions.SEND_MESSAGE, {
        message: {
          content: { text },
          sender: session.user.id,
          receiver: room,
        },
        room: room,
      });
    }
  };

  const onUserSearch = (e) => {
    debounce(() => dispatch(MessageActions.SEARCH_USER, e.target.value), 300)();
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
              <Input onChange={onUserSearch} placeHolder={"Search User"} />
            </div>
          </div>
          {chatUsers?.map((user) => (
            <div
              className={`${styles.user} ${
                room === user.id ? styles.selected : ""
              }`}
              key={user.id}
            >
              <Link
                style={{ position: "relative", width: "100%" }}
                key={user.id}
                href={{ pathname: "/message", query: { room: user.id } }}
              >
                <MiniProfile user={user} />{" "}
                {messageNotifications.has(user.id) && (
                  <span className="notification-badge"></span>
                )}
              </Link>
            </div>
          ))}
        </div>

        {receiver ? (
          <div className={styles.chatBox}>
            <Link href={`/profile/${receiver?.id}`} className={styles.receiver}>
              <MiniProfile user={receiver} />
            </Link>
            <div>
              {messages[room]?.data.map((msg, idx) => (
                <MessageBubble key={msg?.id} message={msg} />
              ))}
              <div className={styles.pageLoader}>
                {!messages[room]?.isLastPage && (
                  <div ref={loaderRef} className="loader"></div>
                )}
              </div>
            </div>
            <div className={styles.sendMsg}>
              <CreatePost
                submitButton="send"
                placeholder="write your message"
                onSubmit={postMessage}
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
