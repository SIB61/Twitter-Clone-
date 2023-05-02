import { MainLayout } from "@/core/layouts/main-layout";
import { dbConnect } from "@/core/utils/db";
import { getUsers } from "@/features/user/services/server/get-user.server";
import { CreatePost } from "@/shared/components/create-post/CreatePost";
import { MiniProfile } from "@/shared/components/mini-profile/MiniProfile";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { use, useCallback, useEffect, useMemo, useRef } from "react";
import styles from "../../styles/Message.module.css";
import { getServerSession } from "next-auth";
import { createOptions } from "../api/auth/[...nextauth]";
import { TbSettings } from "react-icons/tb";
import { MdOutlineForward, MdOutlineForwardToInbox } from "react-icons/md";
import { Input } from "@/shared/components/input/Input";
import { MessageBubble } from "@/features/conversation/components/MessageBubble";
import { debounce } from "@/shared/utils/debounce";
import axios from "axios";
import { useCustomState } from "@/shared/hooks/useCustomState";
import { deleteMessageNotification } from "@/features/notification/services/server/delete-message-notification.server";
import { useMessages } from "@/features/conversation/hooks/useMessages";
import { useSocket } from "@/core/Providers/SocketProvider";
import { getAllConversationsByUser } from "@/features/conversation/services/server/get-conversation.server";
export async function getServerSideProps(ctx) {
  await dbConnect();
  const { user } = await getServerSession(
    ctx.req,
    ctx.res,
    createOptions(ctx.req)
  );
  let users = getUsers();
  users = users.filter((u) => u.id.toString() !== user.id.toString());
  const { room } = ctx.query;
  let receiver;
  let messages = new Promise.resolve([]);
  if (room) {
    const receiverId = room;
    receiver = users.reduce(
      (acc, cur) => (cur.id.toString() === receiverId ? cur : acc),
      undefined
    );
    deleteMessageNotification({
      userId: user.id,
      notificationSenderId: receiverId,
    });
    messages = getAllConversationsByUser({
      userId: user.id,
      receiverID: receiverId,
      pageIndex: 1,
    }).then(msgs => {
      msgs.reverse()
      return Promise.resolve(msgs)
    });
    // messages.reverse();
  }
  return {
    props: JSON.parse(
      JSON.stringify({
        users: await users,
        previousMessages: await messages,
        receiver: receiver,
      })
    ),
  };
}

export default function Page({ users, previousMessages, receiver }) {
  const router = useRouter();
  const { room } = router.query;
  const { data: session } = useSession();
  const userList = useCustomState(users)
  const { messages, newMessage, messageNotifications, sendMessage } = useMessages();
  const socket = useSocket()


  useEffect(() => {
    if (newMessage.value && newMessage.value.sender === room) {
      socket?.emit('see', newMessage.value)
    }
  }, [newMessage.value])

  const pageIndex = useCustomState(2);
  const isLastPage = useCustomState(false);
  const loaderRef = useRef();
  const isLoaderOnScreen = !!useIntersectionObserver(loaderRef, {})
    ?.isIntersecting;

  useEffect(() => {
    if (isLoaderOnScreen && !isLastPage.value) {
      const fetchMoreMessages = async () => {
        try {
          console.log(session?.user.id + " " + receiver.id);
          const { data: newPage } = await axios.post(
            `/api/conversation/?pageIndex=${pageIndex.value}`,
            {
              userId: session?.user.id,
              receiverID: receiver.id,
            }
          );
          console.log(newPage);
          // if (newPage?.data?.length === 0) {
          //   isLastPage.set(true);
          // } else {
          //   conversations.set((state) => [...state, ...newPage?.data]);
          //   pageIndex.set((value) => value + 1);
          // }
        } catch (error) {
          console.log(error);
        }
      };
      fetchMoreMessages();
    }
  }, [isLoaderOnScreen]);


  useEffect(() => {
    if (receiver?.id) {
      messages.set((curr) => {
        if (!curr[receiver.id]) {
          curr[receiver.id] = previousMessages;
        }
        return { ...curr };
      });
      // socket?.emit('see',messages.value[0])
    }
  }, []);

  const postMessage = (message) => {
    if (message) {
      const newMessage = {
        content: { text: message },
        sender: session.user.id,
        receiver: room,
      };
      sendMessage(newMessage);
    }
  };

  const onUserSearch = useCallback((e) => {
    let text = e.target.value.trim();
    const search = async () => {
      const searchKey = text.replace(" ", "_");
      const { data } = await axios.get("/api/user/?search=" + searchKey);
      userList.set(data);
    };
    if (text.length === 0) {
      userList.set(users);
    } else {
      debounce(search, 1000)();
    }
  }, []);

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
          {userList.value?.map((user) => (
            <div
              className={`${styles.user} ${room === user.id ? styles.selected : ""
                }`}
            >
              <Link
                style={{ position: "relative", width: "100%" }}
                key={user.id}
                href={{ pathname: "/message", query: { room: user.id } }}
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
            <Link href={`/profile/${receiver?.id}`} className={styles.receiver}>
              <MiniProfile user={receiver} />
            </Link>
            <div>
<<<<<<< HEAD
  {
    messages?.value[receiver.id]?.map((msg, idx) => (
      <MessageBubble key={idx} message={msg} />
=======
              {conversations.value?.map((msg, idx) => (
                <MessageBubble key={idx} message={msg} />
>>>>>>> development
    ))
  }
  { isLastPage.value ? <></> : <div ref={loaderRef}>Loading</div> }
            </div >
    <div className={styles.sendMsg}>
      <CreatePost
        submitButton="send"
        placeholder="write your message"
        onSubmit={(e) => postMessage(e.text)}
      />
    </div>
          </div >
        ) : (
    <div className={styles.empty}>
      <h1>Select a Message</h1>
      <p>
        Choose from your existing conversations, start a new one, or just
        keep swimming.
      </p>
    </div>
  )
}
      </div >
    </MainLayout >
  );
}
