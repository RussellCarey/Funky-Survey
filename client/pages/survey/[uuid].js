import { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import SurveyContext from "../../context/survey/SurveyContext";
import ModalContext from "../../context/modal/ModalContext";

import { theme } from "../../public/Theme/Theme";

import QuestionTitleBox from "../../components/QuestionTitleBox/QuestionTitleBox";
import NavBar from "../../components/NavBar/NavBar";
import CircleButton from "../../components/CircleButton/CircleButton";
import InputArea from "../../components/InputArea/InputArea";
import PopupBox from "../../components/PopupBox/PopupBox";
import { ButtonContainer } from "../../components/Maker/styled";
import Modal from "../../components/Modal/Modal";

import { getOneSurvey } from "../../utils/fetchServices";

// Holds the whole page.
const Container = styled.div`
  width: 100vw;
  min-height: 100vh;

  // prettier-ignore
  padding: ${theme.Spacing.space.xlarge} ${theme.Spacing.space.xxlarge};

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #6e4fc7;

  @media (max-width: 600px) {
    padding: ${theme.Spacing.space.medium};
  }
`;

const Text = styled.p`
  color: white;
  font-weight: bold;

  font-size: 22px;

  white-space: nowrap;
`;

export default function Survey({ survey }) {
  const router = useRouter();

  // The current survey
  const [current, setCurrent] = useState(null);

  // Anwsers push to the survey..
  const [anwsers, setAnwsers] = useState(null);

  // Popup windows show
  const [popup, setPopup] = useState(false);

  const surveyContext = useContext(SurveyContext);
  const { uploadSurveyAnwserSet } = surveyContext;

  const modalContext = useContext(ModalContext);
  const { modalState, showModal } = modalContext;

  useEffect(() => {
    // Set surveys, if any.
    if (survey) setCurrent(survey);
  }, []);

  // Popup to confirm if to upload the survey..
  const confirmSurvey = () => {
    setPopup(true);
  };

  // Upload users anwsers and show confimration if no error..
  const uploadAnwsers = async () => {
    const uploadedAnwsers = await uploadSurveyAnwserSet(anwsers, survey.id);

    setPopup(false);

    if (uploadedAnwsers.data.status === "success") {
      showModal("Thanks for your time! Upload successful", "ok");

      setTimeout(() => {
        router.push("/");
      }, 3000);
    } else {
      showModal("Upload of anwsers failed, try again");
    }
  };

  const closePopup = () => {
    setPopup(false);
  };

  return (
    <Container>
      {modalState.show === true ? <Modal /> : null}

      {popup ? (
        <PopupBox>
          <Text> Are you sure you want to upload?</Text>
          <ButtonContainer>
            <CircleButton type="tick" onClick={uploadAnwsers} />
            <CircleButton type="cross" onClick={closePopup} />
          </ButtonContainer>
        </PopupBox>
      ) : null}

      <QuestionTitleBox
        text={
          "Thank you for anwsering my survey. Please select a choice for each question. When finished, press the tick button at the bottom to submit!"
        }
        margin={`0 0 ${theme.Spacing.space.large} 0`}
      />

      {current ? (
        <>
          <QuestionTitleBox margin={"0 0 40px 0"} text={current.title} />

          {current.questions.map((data) => {
            {
              return <InputArea questionData={data} setAnwsers={setAnwsers} anwsers={anwsers} />;
            }
          })}
        </>
      ) : null}
      <CircleButton type={"tick"} onClick={confirmSurvey} />
    </Container>
  );
}

export async function getServerSideProps({ req, query }) {
  const survey = await getOneSurvey(query.uuid, req.cookies.jwt);
  return { props: { survey: survey.data.data } };
}
