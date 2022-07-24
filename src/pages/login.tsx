import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import Form from "../components/Form";
import Input from "../components/Input";
import Loader from "../components/Loader";
import Nav from "../components/Nav";
import PrimaryButton from "../components/PrimaryButton";
import Title from "../components/Title";
import { openModal } from "../redux/reducers/modalReducer";
import { openToast } from "../redux/reducers/toastReducer";
import { setToken } from "../redux/reducers/userReducer";
import styles from "../styles/Login-styles.module.css";
import { emailValidator } from "../Utils/emailValidator";
import { passwordValidator } from "../Utils/passwordValidator";
import { trpc } from "../Utils/trpc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value.trim());
  };

  const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const mutation = trpc.useMutation(["user.login"]);

  const router = useRouter();

  const dispatch = useDispatch();

  const handleLogin = async (e: SubmitEvent) => {
    try {
      e.preventDefault();

      const { message, token } = await mutation.mutateAsync({
        email,
        password,
      });

      dispatch(openToast({ message, status: "success" }));
      dispatch(setToken(token));
      router.push("/dashboard");
    } catch (e: any) {
      dispatch(
        openModal({
          title: "Error",
          message: e.message,
          status: "error",
        })
      );
    }
  };

  if (mutation.isLoading) {
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
