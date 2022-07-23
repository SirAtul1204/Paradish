import { ChangeEvent, useState } from "react";
import Input from "../components/Input";
import Nav from "../components/Nav";
import PrimaryButton from "../components/PrimaryButton";
import Form from "../components/Form";
import styles from "../styles/Register-styles.module.css";
import Title from "../components/Title";
import { emailValidator } from "../Utils/emailValidator";
import { nameValidator } from "../Utils/nameValidator";
import { passwordValidator } from "../Utils/passwordValidator";
import { trpc } from "../Utils/trpc";
import Loader from "../components/Loader";

const Register = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const changeRestaurantName = (e: ChangeEvent<HTMLInputElement>) => {
    setRestaurantName(e.target.value.trimStart());
  };

  const changeOwnerName = (e: ChangeEvent<HTMLInputElement>) => {
    setOwnerName(e.target.value.trimStart());
  };

  const changeOwnerEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setOwnerEmail(e.target.value.trimStart());
  };

  const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const changeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const mutation = trpc.useMutation("restaurant.create");

  const handleRegister = async (e: SubmitEvent) => {
    e.preventDefault();
    const data = await mutation.mutateAsync({
      restaurantName,
      ownerEmail,
      ownerName,
      password,
    });

    console.log(data);
  };

  return <Loader content="Creating your account!" />;

  if (mutation.isLoading) {
    return <Loader />;
  }

  return (
    <div className="mainWrapper">
      <Nav />
      <div className={`${styles.major} mw-wrapper`}>
        <Title
          content="Fill out this short form to get started today!"
          variant="h2"
          color="white"
        />
        <Form>
          <Input
            type="text"
            content="Restaurant Name"
            required
            value={restaurantName}
            modifier={changeRestaurantName}
            validator={nameValidator}
          />
          <Input
            type="text"
            content="Owner Name"
            required
            value={ownerName}
            modifier={changeOwnerName}
            validator={nameValidator}
          />
          <Input
            type="text"
            content="Owner Email"
            required
            value={ownerEmail}
            modifier={changeOwnerEmail}
            validator={emailValidator}
          />
          <Input
            type="password"
            content="Password"
            required
            value={password}
            modifier={changePassword}
            validator={passwordValidator}
          />
          <Input
            type="password"
            content="Confirm Password"
            required
            value={confirmPassword}
            modifier={changeConfirmPassword}
            isEqualTo={password}
          />
          <PrimaryButton
            type="submit"
            content="Register Now!"
            variant="big"
            action={handleRegister}
          />
        </Form>
      </div>
    </div>
  );
};

export default Register;
