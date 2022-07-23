import { ChangeEvent, useState } from "react";
import Form from "../components/Form";
import Input from "../components/Input";
import Nav from "../components/Nav";
import PrimaryButton from "../components/PrimaryButton";
import Title from "../components/Title";
import styles from "../styles/Login-styles.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e: SubmitEvent) => {
    e.preventDefault();
  };

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
          />
          <Input
            content="Password"
            type="password"
            value={password}
            modifier={changePassword}
          />
          <PrimaryButton type="submit" content="Login" action={handleLogin} />
        </Form>
      </div>
    </div>
  );
};

export default Login;
