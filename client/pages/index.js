import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";

import Modal from "../components/Modal/Modal";
import ModalContext from "../context/modal/ModalContext";

import styled from "styled-components";
import { theme } from "../public/Theme/Theme";

import SquaredButton from "../components/SquaredButton/SquaredButton";
import StandardDiv from "../components/StandardDiv";

import { login, checkIfUserLoggedIn } from "../utils/authServices";
import { ButtonContainer } from "../components/maker/styled";

// Holds the whole page.
const Container = styled.div`
  width: 100%;
  height: 100vh;

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

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

const Text = styled.h1`
  color: white;
  font-weight: bold;
  font-size: 40px;
  margin-bottom: ${theme.Spacing.space.large};
`;

export default function Home({ userData, error }) {
  const router = useRouter();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const modalContext = useContext(ModalContext);
  const { modalState, showModal } = modalContext;

  useEffect(() => {
    if (userData.status === "success") router.push("/dashboard");
  }, []);

  // Set the state for the email
  const emailChange = (e) => {
    setemail(e.target.value);
  };

  // Set the state for the password
  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  // Submit login attempt.
  const submitLogin = async (username, password) => {
    console.log("TRYING TO LOG IN");
    const loginAttempt = await login(username, password);

    // If nothing is returned from the function show modal, (big error)
    if (!loginAttempt) {
      return showModal("Login failed, please try again", "fail");
    }

    // Deal with login response
    if (loginAttempt.data.status === "success") {
      showModal("Loggin in!", "ok");
      router.push("/dashboard");
    } else {
      showModal("Login failed, please try again", "fail");
    }
  };

  return (
    <Container>
      {modalState.show === true ? <Modal /> : null}

      <StandardDiv>
        <Text>Coolveys</Text>
        <Input onChange={emailChange} value={email} placeholder="email" />
        <Input type="password" onChange={passwordChange} value={password} placeholder="password" />
        <ButtonContainer>
          <SquaredButton text={"login"} margin={"20px"} onClick={() => submitLogin(email, password)} />

          <SquaredButton text={"sign up"} margin={"0"} onClick={() => router.push("/signup")} />
        </ButtonContainer>
      </StandardDiv>
    </Container>
  );
}

export async function getServerSideProps({ res, req, params }) {
  let userData = {};
  if (req.cookies.jwt) userData = await checkIfUserLoggedIn(req);
  return { props: { userData: userData } };
}
