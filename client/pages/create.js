import React, { useState, useContext } from "react";
import styled from "styled-components";

import { theme } from "../public/Theme/Theme";
import SurveyContext from "../context/survey/SurveyContext";
import ModalContext from "../context/modal/ModalContext";

import NavBar from "../components/NavBar";
import CircleButton from "../components/CircleButton";

import QuestionTitleInput from "../components/maker/QuestionTitleInput";
import QuestionInput from "../components/maker/QuestionInput";
import QuestionChoice from "../components/maker/QuestionChoice";

import Modal from "../components/Modal";

import QuestionTitleBox from "../components/QuestionTitleBox";

import { checkIfUserLoggedIn } from "../utils/authServices";
import ConfirmPopup from "../components/ConfirmPopup";
import router from "next/router";

// Holds the whole page.
const Container = styled.div`
  width: 100vw;
  min-height: 100vh;

  padding: 120px;

  display: flex;
  flex-direction: column;

  background-color: ${theme.Colors.ui.lightblue};

  @media (max-width: 600px) {
    padding: ${theme.Spacing.space.medium};
    padding-top: 120px;
  }
`;

// Holds the questionairs only.
const BottomButtonsContainer = styled.div`
  // Account for the navbar size
  margin-bottom: ${theme.Spacing.space.large};

  display: flex;
  justify-content: center;
`;

const AnwserContainer = styled.div`
  height: min-content;
  width: 100%;

  background-color: ${theme.Colors.ui.purple};
  border-radius: ${theme.Border.borderRadius};
  border: solid ${theme.Border.borderThickness}${theme.Colors.border.main};
  box-shadow: 10px 10px 0px ${theme.Colors.shadow.purple};

  padding: ${theme.Spacing.space.medium} ${theme.Spacing.space.large};

  display: flex;
  flex-direction: column;
  align-items: center;

  margin: ${(props) => props.margin};
`;

export default function Create({ userData, errorCode }) {
  const [popup, setPopup] = useState(false);
  const [type, setType] = useState(null);

  const surveyContext = useContext(SurveyContext);
  const { newSurveyState, uploadSurveyToDB } = surveyContext;

  const modalContext = useContext(ModalContext);
  const { modalState, showModal } = modalContext;

  // If beaking error on page load, show error page.
  if (errorCode) {
    return <Error title={errorCode} />;
  }

  // Start buuilding the survey
  const StartBuildingQuestion = () => {
    if (newSurveyState.title) {
      setType("input");
    } else {
      setType("title");
    }
  };

  // Upload survey to the database
  const completeBuildingSurvey = async () => {
    const upload = await uploadSurveyToDB(newSurveyState, userData.jwt);

    // After time to process modal, redirect..
    if (upload.data.status === "success") {
      showModal("Upload successful, redirecting", "ok");

      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    } else {
      showModal("Upload failed, try again or refresh page", "fail");
    }
  };

  return (
    <Container>
      <NavBar showModal={showModal} userData={userData} />

      {modalState.show === true ? <Modal /> : null}

      {popup ? (
        <ConfirmPopup text={"Upload survey to the database?"} confirm={completeBuildingSurvey} cancel={setPopup} />
      ) : null}

      <BottomButtonsContainer>
        <CircleButton type={"plus"} onClick={(e) => StartBuildingQuestion(e)} />

        {newSurveyState.title ? <CircleButton type={"tick"} onClick={(e) => setPopup(true)} /> : null}
      </BottomButtonsContainer>

      {type === "title" ? <QuestionTitleInput setType={setType} modalState={modalState} showModal={showModal} /> : null}

      {type === "type" ? <QuestionTypeInput setType={setType} modalState={modalState} showModal={showModal} /> : null}

      {type === "input" ? <QuestionInput setType={setType} modalState={modalState} showModal={showModal} /> : null}

      {type === "choice" ? <QuestionChoice setType={setType} modalState={modalState} showModal={showModal} /> : null}

      {newSurveyState.title ? <QuestionTitleBox text={newSurveyState.title} margin={" 0 0 64px 0"} /> : null}

      {newSurveyState.questions.length > 0
        ? newSurveyState.questions.map((question) => {
            return (
              <>
                <QuestionTitleBox key={question.title} text={question.title} margin={" 0 0 24px 0"} />

                <AnwserContainer margin={" 0 0 64px 0"}>
                  {question.type === "number" ? (
                    <p>
                      A number input field will be show to the user. If you want a range or choics of certain numbers,
                      please use the choice option.
                    </p>
                  ) : null}

                  {question.type === "typed" ? <p>A text box will be displayed to the user.</p> : null}

                  {question.type === "choice"
                    ? question.choices.map((choice) => {
                        return <p key={choice}>{choice}</p>;
                      })
                    : null}
                </AnwserContainer>
              </>
            );
          })
        : null}
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

  return { props: { userData: userData } };
}
