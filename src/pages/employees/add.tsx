import { Role } from "@prisma/client";
import { useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown";
import Input, { InputProps } from "../../components/Input";
import Nav from "../../components/Nav";
import Title from "../../components/Title";
import styles from "../../styles/AddEmployees-styles.module.css";
import { emailValidator } from "../../Utils/emailValidator";
import { nameValidator } from "../../Utils/nameValidator";

const AddEmployee = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>();
  const [phoneNumber, setPhoneNumber] = useState("");

  const inputs: InputProps[] = [
    {
      content: "First Name",
      type: "text",
      value: firstName,
      modifier: (e: any) => setFirstName(e.target.value),
      required: true,
      validator: () => nameValidator(firstName),
    },
    {
      content: "Last Name",
      type: "text",
      value: lastName,
      modifier: (e: any) => setLastName(e.target.value),
      required: true,
      validator: () => nameValidator(lastName),
    },
    {
      content: "Email",
      type: "email",
      value: email,
      modifier: (e: any) => setEmail(e.target.value),
      required: true,
      validator: () => emailValidator(email),
    },
    {
      content: "Phone Number",
      type: "text",
      value: phoneNumber,
      modifier: (e: any) => setPhoneNumber(e.target.value),
    },
  ];

  useEffect(() => {
    console.log(firstName);
    console.log(role);
  });

  return (
    <div className="mainWrapper">
      <Nav />
      <div className={`${styles.major} mw-wrapper`}>
        <Title color="white" variant="h2" content="Add Employees!" />
        <div className={styles.formContainer}>
          <div className={styles.form}>
            {inputs.map((input) => (
              <Input key={input.content} {...input} />
            ))}
            <Dropdown
              label="Role"
              options={Object.keys(Role)}
              value={role}
              onSelect={(value?: Role) => setRole(value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
