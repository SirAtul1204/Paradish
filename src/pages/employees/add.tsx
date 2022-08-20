import { Role } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CheckBoxGroup from "../../components/CheckboxGroup";
import Dropdown from "../../components/Dropdown";
import Input, { InputProps } from "../../components/Input";
import Nav from "../../components/Nav";
import PrimaryButton from "../../components/PrimaryButton";
import Title from "../../components/Title";
import Type from "../../components/Type";
import { openModal } from "../../redux/reducers/modalReducer";
import styles from "../../styles/AddEmployees-styles.module.css";
import { emailValidator } from "../../Utils/emailValidator";
import { nameValidator } from "../../Utils/nameValidator";
import { authOptions } from "../api/auth/[...nextauth]";

const AddEmployee = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [checkboxes, setCheckboxes] = useState([
    { label: "English", isChecked: false },
    { label: "Hindi", isChecked: false },
    { label: "Tamil", isChecked: false },
  ]);
  const [photo, setPhoto] = useState<File>();
  const [pan, setPan] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [address, setAddress] = useState("");

  const handlePhoto = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png, image/jpeg";
    input.onchange = (e: any) => {
      console.log(e.target.files);
      setPhoto(e.target.files[0]);
    };

    input.click();
  };

  const updateLanguagesKnown = (language: string, checked: boolean) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes.forEach((checkbox) => {
      if (checkbox.label === language) {
        checkbox.isChecked = checked;
      }
    });

    setCheckboxes(newCheckboxes);
  };

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

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (
      nameValidator(firstName) &&
      nameValidator(lastName) &&
      emailValidator(email) &&
      photo &&
      pan &&
      aadhar
    ) {
    } else {
      dispatch(
        openModal({
          title: "Error",
          message: "Please fill all the fields",
          status: "error",
        })
      );
    }
  };

  useEffect(() => {
    console.log(photo);
  });

  return (
    <div className="mainWrapper">
      <Nav />
      <div className={`${styles.major} mw-wrapper`}>
        <Title color="white" variant="h2" content="Add Employees!" />
        <div className={styles.formContainer}>
          <div className={styles.form}>
            <div className={styles.left}>
              {inputs.map((input) => (
                <Input key={input.content} {...input} />
              ))}
              <Dropdown
                label="Role"
                options={Object.keys(Role)}
                value={role as Role}
                onSelect={(value: string) => setRole(value as Role)}
              />
              <CheckBoxGroup
                title="Languages Known"
                checkboxes={checkboxes}
                onChangeHandler={updateLanguagesKnown}
              />
            </div>
            <div className={styles.right}>
              <div className={styles.mid}>
                <div className={styles.photoHolder} onClick={handlePhoto}>
                  {photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="photo"
                      width="100%"
                      height="100%"
                      // layout="fill"
                    />
                  ) : (
                    <div className={styles.photo}>
                      <Image
                        src="/assets/plus.svg"
                        alt="plus"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  )}
                </div>
                <Type
                  color="white"
                  content={
                    photo
                      ? "Click the image to upload a new photo"
                      : "Upload Photo"
                  }
                />
              </div>
              <Input
                type="text"
                content="PAN Number"
                value={pan}
                required
                modifier={(e) => {
                  setPan(e.target.value);
                }}
              />
              <Input
                type="text"
                content="Aadhar Number"
                value={aadhar}
                required
                modifier={(e) => {
                  setAadhar(e.target.value);
                }}
              />
              <Input
                type="text"
                content="Address"
                value={address}
                modifier={(e) => setAddress(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <PrimaryButton content="Add Employee" action={handleSubmit} />
      </div>
    </div>
  );
};

export default AddEmployee;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  if (!session || !session.user) {
    return {
      redirect: { permanent: false, destination: "/login" },
    };
  }

  console.log(session);

  return {
    props: {
      userEmail: session.user.email,
      userName: session.user.name,
    },
  };
}
