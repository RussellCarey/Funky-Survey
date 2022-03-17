import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";

import Modal from "../components/Modal/Modal";
import ModalContext from "../context/modal/ModalContext";

import styled from "styled-components";
import { theme } from "../public/Theme/Theme";

import SquaredButton from "../components/SquaredButton/SquaredButton";
import StandardDiv from "../components/StandardDiv";

import { signupUser } from "../utils/authServices";
import { ButtonContainer } from "../components/maker/styled";

// Holds the whole page.
const Container = styled.div`
  width: 100vw;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${theme.Colors.ui.purple};
`;

const Input = styled.input`
  border: solid ${theme.Border.borderThickness}${theme.Colors.border.main};
  outline: none;
  width: 100%;
  font-family: inherit;

  color: ${theme.Colors.border.main};
  font-size: 18px;
  padding: ${theme.Spacing.space.medium} ${theme.Spacing.space.large};
  border-radius: 20px;

  margin-bottom: 20px;
`;

const Text = styled.h1`
  color: white;
  font-weight: bold;
  font-size: 40px;
  margin-bottom: ${theme.Spacing.space.large};
`;

export default function Signup() {
  const router = useRouter();

  // Data for the signup forms..
  const [signup, setSignUp] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
  });

  const modalContext = useContext(ModalContext);
  const { modalState, showModal } = modalContext;

  // Set the state for the email
  const inputChange = (name, value) => {
    setSignUp({ ...signup, [name]: value });
  };

  // Submit user and do a check on the forms..
  const submitUser = async () => {
    // Is the password greater than 8 in length
    if (signup.password.length < 8) {
      return showModal("Password must be more than 8 characters", "fail");
    }

    // Does the email contain an @ and a . ?
    if (!signup.email.includes("@") || !signup.email.includes(".")) {
      return showModal("Please enter a valid email", "fail");
    }

    const signUpData = await signupUser(signup);

    // If the error was handled on the server by me, show my error.
    if (signUpData.data.status !== "success" && signUpData.data.error.isOperational === true) {
      showModal(`${signUpData.data.message}`, "fail");
    }

    // If not show a generic error.
    if (signUpData.data.status !== "success" && signUpData.data.error.isOperational === false) {
      showModal(`Something went wrong, please try again.`, "fail");
    }

    if (signUpData.data.status === "success") {
      showModal("Sign up successful, please wait!", "ok");

      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    }
  };

  return (
    <Container>
      {modalState.show === true ? <Modal /> : null}

      <StandardDiv>
        <Text>sign up</Text>
        <Input onChange={(e) => inputChange("name", e.target.value)} value={signup.name} placeholder="full name" />
        <Input onChange={(e) => inputChange("email", e.target.value)} value={signup.email} placeholder="email" />
        <Input
          onChange={(e) => inputChange("username", e.target.value)}
          value={signup.username}
          placeholder="username"
        />
        <Input
          type="password"
          onChange={(e) => inputChange("password", e.target.value)}
          value={signup.password}
          placeholder="password"
        />
        <Input
          type="password"
          onChange={(e) => inputChange("passwordConfirm", e.target.value)}
          value={signup.passwordConfirm}
          placeholder="confirm password"
        />

        <ButtonContainer>
          <SquaredButton text={"sign up"} margin={"20px"} onClick={() => submitUser()} />
        </ButtonContainer>
      </StandardDiv>
    </Container>
  );
}
