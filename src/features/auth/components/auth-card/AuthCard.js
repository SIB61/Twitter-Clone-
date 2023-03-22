import styles from "./AuthCard.module.css";
import { BsGithub } from "react-icons/bs";
export function AuthCard() {
  return (
    <div className={styles.authCard}>
      <div className={styles.title}>New to Twitter</div>
      <div className={styles.subtitle}>
        <span>Sign up now to get your own personalized timeline!</span>
      </div>
      <button className={'btn btn-ghost ' + styles.btnGithub}>
        <BsGithub />
        Sign up with Github
      </button>
      <button className={'btn btn-ghost ' + styles.btnEmail}>
        Create Account
      </button>
      <p className={styles.subtitle}>
        By signing up, you agree to the <span className="text-primary">Terms of Service </span> and <span className="text-primary"> Privacy Policy</span>,
        including <span className="text-primary"> Cookie Use</span>.
      </p>
    </div>
  );
}
