import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import Form from "../components/Form";
import Input from "../components/Input";
import Nav from "../components/Nav";
import PrimaryButton from "../components/PrimaryButton";
import Title from "../components/Title";
import { openModal } from "../redux/reducers/modalReducer";
import { openToast } from "../redux/reducers/toastReducer";
import styles from "../styles/Login-styles.module.css";
import { emailValidator } from "../Utils/emailValidator";
import { passwordValidator } from "../Utils/passwordValidator";
import { signIn } from "next-auth/react";
import { unstable_getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import Loader from "../components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value.trim());
  };

  const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const router = useRouter();

  const dispatch = useDispatch();

  const handleLogin = async (e: SubmitEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const options = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (!options || !options.ok) throw new Error("Wrong Credentials");

      dispatch(
        openToast({
          message: "You are logged in successfully",
          status: "success",
        })
      );
      router.push("/dashboard");
    } catch (e: any) {
      dispatch(
        openModal({
          title: "Error",
          message: e.message,
          status: "error",
        })
      );

      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader content="Logging you in!" />;
  }

  return (
    <div className="mainWrapper">
      <Nav />
      <div className={`${styles.major} mw-wrapper`}>
        <Title color="white" content="Login to continue!" variant="h2" />
        <Form>
          <Input
            content="Email"
            type="text"
            value={email}
            modifier={changeEmail}
            validator={emailValidator}
          />
          <Input
            content="Password"
            type="password"
            value={password}
            modifier={changePassword}
            validator={passwordValidator}
          />
          <PrimaryButton type="submit" content="Login" action={handleLogin} />
        </Form>
      </div>
    </div>
  );
};

export default Login;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  console.log("Session", session);
  if (session) {
    return {
      redirect: { permanent: false, destination: "/dashboard" },
    };
  }

  return {
    props: {},
  };
}
