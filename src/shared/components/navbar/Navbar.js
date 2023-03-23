import { FaHashtag, FaRegUser, FaSearch } from "react-icons/fa";
import { CgFeed, CgMore, CgMoreO, CgProfile } from "react-icons/cg";
import styles from "./Navbar.module.css";
import { RiHashtag, RiHome7Fill, RiHomeLine } from "react-icons/ri";
import { GrInbox, GrNotification } from "react-icons/gr";
import { BiHash, BiHomeCircle } from "react-icons/bi";
import { CiCircleMore, CiCircleRemove } from "react-icons/ci";
import Link from "next/link";
import TwitterLogo from "public/images/Twitter-logo.png";
import Dp from "public/images/dp.jpg";
import Image from "next/image";
import { Avator } from "@/features/user/components/avatar/Avatar";
import { useToggle } from "@/shared/hooks/useToggle";
import { Modal } from "../modal/Modal";
import { CreateTweet } from "@/features/tweet/components/create-tweet/CreateTweet";
import { useContext } from "react";
import { ModalContext } from "@/core/layouts/main-layout";
import { useRouter } from "next/router";

const options = [
  {
    title: "Home",
    route: "/search",
    icon: BiHomeCircle,
  },
  {
    title: "Explore",
    route: "/search",
    icon: RiHashtag,
  },

  {
    title: "Notifications",
    route: "/search",
    icon: GrNotification,
  },

  {
    title: "Messages",
    route: "/search",
    icon: GrInbox,
  },

  {
    title: "Profile",
    route: "/search",
    icon: FaRegUser,
  },

  {
    title: "More",
    route: "/search",
    icon: CgMoreO,
  },
];

export function Navbar() {
  const [showModal, toggleModal] = useToggle();
  const setModal = useContext(ModalContext)
  const router = useRouter()
  const {page} = router.query
  return (
    <>
    <nav className={styles.navbar}>

      <ul className={styles.navList}>
        <li className={styles.logoItem}>
          <Image src={TwitterLogo} className={styles.logo} />
        </li>
        {options.map((v, i) => (
          <li key={i} className={styles.navItem}>
            {<v.icon className={styles.navIcon} />}
            <span className={styles.navText}>{v.title}</span>
          </li>
        ))}
        <li>
          <Link className={styles.tweetButton} href='?page=create-tweet'>
            Tweet
          </Link>
        </li>
        <li className={styles.profile}>
          <Avator src={Dp} size={"3rem"} />
          <div>
            <div className={styles.name}>Md Sabit Islam Bhuiya</div>
            <div className={styles.username}>@sib_61</div>
          </div>
          <CgMore />
        </li>
      </ul>
    </nav>
    </>
  );
}
