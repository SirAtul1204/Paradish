import { ChangeEvent, useState } from "react";
import Input from "../components/Input";
import Nav from "../components/Nav";
import PrimaryButton from "../components/PrimaryButton";
import Form from "../components/Form";
import styles from "../styles/Register-styles.module.css";
import Title from "../components/Title";

const Register = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const changeOwnerName = (e: ChangeEvent<HTMLInputElement>) => {
    setOwnerName(e.target.value);
  };

  const changeOwnerEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setOwnerEmail(e.target.value);
  };

  const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const changeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleRegister = (e: SubmitEvent) => {
    e.preventDefault();
    console.log("Submit Clicked");
  };

  return (
    <div className="mainWrapper bg-tertiary">
      <Nav />
      <div className={`${styles.major} mw-wrapper`}>
        <Title
          content="Fill out this short form to get started today!"
          variant="h2"
        />
        <Form>
          <Input
            type="text"
            content="Restaurant Name"
            required
            value={restaurantName}
            modifier={setRestaurantName}
          />
          <Input
            type="text"
            content="Owner Name"
            required
            value={ownerName}
            modifier={changeOwnerName}
          />
          <Input
            type="text"
            content="Owner Email"
            required
            value={ownerEmail}
            modifier={changeOwnerEmail}
          />
          <Input
            type="password"
            content="Password"
            required
            value={password}
            modifier={changePassword}
          />
          <Input
            type="password"
            content="Confirm Password"
            required
            value={confirmPassword}
            modifier={changeConfirmPassword}
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
