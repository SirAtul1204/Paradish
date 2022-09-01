import { NextPage } from "next";
import Nav from "../components/Nav";
import { DefaultProps } from "../Utils/interface";
import styles from "../styles/PasswordReset-styles.module.css";
import Title from "../components/Title";
import Form from "../components/Form";
import Input from "../components/Input";
import { useState } from "react";
import { emailValidator } from "../Utils/emailValidator";
import basicValidator from "../Utils/basicValidator";
import { passwordValidator } from "../Utils/passwordValidator";
import PrimaryButton from "../components/PrimaryButton";
import { trpc } from "../Utils/trpc";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { openToast } from "../redux/reducers/toastReducer";
import { openModal } from "../redux/reducers/modalReducer";
import { useRouter } from "next/router";

const PasswordReset: NextPage<DefaultProps> = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { isLoading, isSuccess, mutateAsync } = trpc.useMutation(
    "user.reset-password"
  );

  const dispatch = useDispatch();

  const router = useRouter();

  const handleSubmit = async (e: SubmitEvent) => {
    try {
      e.preventDefault();
      const data = await mutateAsync({
        email,
        token,
        password,
      });

      dispatch(openToast({ message: data.message, status: "success" }));
      router.push("/login");
    } catch (e: any) {
      dispatch(
        openModal({ message: e.message, status: "error", title: "Error" })
      );
    }
  };

  if (isLoading || isSuccess) return <Loader content="Resetting Password..." />;

  return (
    <div className="mainWrapper">
      <Nav />
      <div className={`${styles.major} mw-wrapper`}>
        <Title color="white" variant="h2" content="Password Reset" />
        <Form>
          <Input
            content="Email"
            type="email"
            value={email}
            modifier={(e) => setEmail(e.target.value)}
            required
            validator={emailValidator}
          />
          <Input
            content="Token"
            type="text"
            value={token}
            modifier={(e) => setToken(e.target.value)}
            required
          />
          <Input
            content="New Password"
            type="password"
            value={password}
            modifier={(e) => setPassword(e.target.value)}
            required
            validator={passwordValidator}
          />
          <Input
            content="Confirm Password"
            type="password"
            value={confirmPassword}
            modifier={(e) => setConfirmPassword(e.target.value)}
            required
            isEqualTo={password}
          />
          <PrimaryButton content="Reset Password" action={handleSubmit} />
        </Form>
      </div>
    </div>
  );
};

export default PasswordReset;
