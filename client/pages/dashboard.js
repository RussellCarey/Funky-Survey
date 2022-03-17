import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import { theme } from "../public/Theme/Theme";

import SquaredButton from "../components/SquaredButton/SquaredButton";
import QuestionnaireAndButton from "../components/QuestionairAndButton/QuestionnaireAndButton";
import NavBar from "../components/NavBar/NavBar";
import Modal from "../components/Modal/Modal";

import { checkIfUserLoggedIn } from "../utils/authServices";
import { getAllSurveys } from "../utils/fetchServices";

import ModalContext from "../context/modal/ModalContext";
import Error from "next/error";

// Holds the whole page.
const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  background-color: ${theme.Colors.ui.lightblue};

  overflow: hidden;
`;

// Holds the questionairs only.
const QuestionaireContainer = styled.div`
  width: 100%;
  height: 100%;

  // Account for the navbar size
  margin-top: 80px;
  padding-top: 40px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Dashboard({ userData, surveys, errorCode }) {
  const router = useRouter();
  const [userSurveys, setUserSurveys] = useState([]);

  const modalContext = useContext(ModalContext);
  const { modalState, showModal } = modalContext;

  // If error in loading pre data, show error page.
  if (errorCode) {
    return <Error title={errorCode} />;
  }

  useEffect(() => {
    // Check user data was recieved as they are logged in.
    if (userData.status !== "success" || userData === null) router.push("http://127.0.0.1:3000");

    // Set their surveys into state.
    setUserSurveys(surveys);
    showModal("Retrieved surveys", "ok");
  }, []);

  // Go the the survey creation page
  const clickCreateNew = () => {
    router.push("/create");
  };

  // Go to a surveys results page..
  const handleDirectToViewSurvey = (uuid) => {
    router.push(`/results/${uuid}`);
  };

  return (
    <Container>
      <NavBar showModal={showModal} userData={userData} />

      {modalState.show === true ? <Modal /> : null}

      <QuestionaireContainer>
        <SquaredButton onClick={(e) => clickCreateNew(e)} text="Create new" margin={"0 0 40px 0"} />

        {userSurveys
          ? userSurveys.map((sur) => {
              return (
                <QuestionnaireAndButton
                  key={sur.uuid}
                  surveyData={sur}
                  onClick={() => handleDirectToViewSurvey(sur.uuid)}
                  userData={userData}
                />
              );
            })
          : null}
        {/* */}
      </QuestionaireContainer>
    </Container>
  );
}

export async function getServerSideProps({ res, req, params }) {
  const userData = await checkIfUserLoggedIn(req);

  // If function returns an error.. redirect to an error page..
  if (userData.status !== "success") {
    return {
      props: {
        errorCode: "Something went wrong. Please go to the homepage and try to log in.",
      },
    };
  }

  const surveys = await getAllSurveys(req.cookies.jwt);

  return {
    props: {
      userData: userData,
      surveys: surveys.data.data,
    },
  };
}
