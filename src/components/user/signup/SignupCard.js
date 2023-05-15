import styles from "./SignupCard.module.css";
import tweeterLogo from "../../../../public/images/Twitter-logo.png";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useLoading } from "@/hooks/useLoading";
import { useToast } from "@/hooks/useToast";
import { useActionDispatcher } from "@/hooks/useAction";
import { LoadingBar } from "@/components/common/loading-bar/LoadingBar";
import { Input } from "@/components/common/input/Input";
import { UserActions } from "@/actions/user.action";
export function SignupCard() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();
  const router = useRouter();
  const loading = useLoading();
  const createToast = useToast();
  const [state, dispatch] = useActionDispatcher({
    success: undefined,
    error: undefined,
    loading:false
  });

  useEffect(() => {
    if (state.error) {
      createToast({ text: state.error.message });
    }
  }, [state.error]);

  useEffect(() => {
    if (state.success) {
      createToast({ text: state.success.message });
    }
  }, [state.success]);

  useEffect(()=>{
    if(state.loading){
      loading.start()
    }else{
      loading.complete()
    }
  },[state.loading])

  const onSubmit = async (data) => {
    try {
      // loading.start();
      // const user = await axios.post("/api/user", data);
      await dispatch(UserActions.REGISTER,data)
      // loading.complete();
      router.push("/", "", { shallow: true });
      // createToast({ text: "Email verification link sent." });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <LoadingBar loading={loading.loading} />
      <div className={styles.signupCard}>
        <Image src={tweeterLogo} alt="tweeter" className={styles.tweeterLogo} />
        <h4>Sign up to Twitter</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register("name", {
              minLength: 3,
              required: "name is required",
            })}
            placeHolder="name"
          />
          <Input
            register={register("email", { required: "email is required" })}
            placeHolder="email"
          />
          <Input
            register={register("dateOfBirth", {
              required: "date of birth is required",
            })}
            placeHolder="date of birth"
            type="date"
          />
          <Input
            register={register("password", {
              required: "password is required",
            })}
            placeHolder="password"
          />
          <button
            disabled={!isValid}
            className={`btn  ${isValid ? "btn-primary" : "btn-disabled"}`}
            type="submit"
          >
            Sign up
          </button>
        </form>
        <p>
          allready have an account?{" "}
          <span className="text-primary">
            {" "}
            <Link href="?page=login">login</Link>{" "}
          </span>{" "}
        </p>
      </div>
    </>
  );
}
