import { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import { theme } from "../../public/Theme/Theme";

import { checkIfUserLoggedIn } from "../../utils/authServices";
import { getPercentageResults } from "../../utils/fetchServices";

import ModalContext from "../../context/modal/ModalContext";
import Modal from "../../components/Modal/Modal";

import QuestionTitleBox from "../../components/QuestionTitleBox/QuestionTitleBox";
import QuestionResult from "../../components/QuestionResult";
import NavBar from "../../components/NavBar/NavBar";

// Holds the whole page.
const Container = styled.div`
  width: 100vw;
  min-height: 100vh;

  padding: 120px;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${theme.Colors.ui.lightblue};

  @media (max-width: 600px) {
    padding: ${theme.Spacing.space.medium};
    padding-top: 120px;
  }
`;

export default function Survey({ userData, survey, errorCode, modalErrorCode }) {
  const router = useRouter();

  const modalContext = useContext(ModalContext);
  const { modalState, showModal } = modalContext;

  // Any breaking errors? Show error page
  if (errorCode) {
    return <Error title={errorCode} />;
  }

  // Non breaking error..
  if (modalErrorCode) {
    showModal("Error getting survey data, please try again.", "fail");
  }

  useEffect(() => {
    // Push user back to homepage if no login..
    if (userData.status !== "success") router.push("http://127.0.0.1:3000/");

    // Show modal if not survey data object was returned..
    if (survey) showModal("Retrieved survey data", "ok");
    if (!survey) showModal("Error or not data to retrieve", "fail");
  }, []);

  return (
    <Container>
      <NavBar showModal={showModal} userData={userData} />

      {modalState.show === true ? <Modal /> : null}

      <QuestionTitleBox text={`${survey.title}`} />

      {survey.questions.length > 0
        ? survey.questions.map((ques) => {
            return <QuestionResult question={ques} key={ques.id} />;
          })
        : null}
    </Container>
  );
}

export async function getServerSideProps({ req, query }) {
  const userData = await checkIfUserLoggedIn(req);

  // If function returns an error.. redirect to an error page..
  if (userData.status !== "success") {
    return {
      props: {
        errorCode: "Something went wrong. Please login again.",
      },
    };
  }

  const results = await getPercentageResults(query.uuid, req.cookies.jwt);

  // If function returns an error.. redirect to an error page..
  if (userData.status !== "success") {
    return {
      props: {
        errorCode: "Something went wrong. Please go to the homepage and try to log in.",
      },
    };
  }

  return { props: { userData: userData, survey: results.data.data } };
}
