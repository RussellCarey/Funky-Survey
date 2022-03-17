import { useState, useContext } from "react";
import { Container, InfoContainer, Text } from "./QB.Styled";
import CircleButton from "../CircleButton/CircleButton";
import { ButtonContainer } from "../Maker/styled";
import PopupBox from "../PopupBox/PopupBox";
import ConfirmPopup from "../ConfirmPopup/ConfirmPopup";
import Modal from "../Modal/Modal";
import SurveyContext from "../../context/survey/SurveyContext";
import ModalContext from "../../context/modal/ModalContext";
import { useRouter } from "next/router";
import { serverUrl } from "../../utils/serverURL";

export default function QuestionnaireAndButton({ surveyData, onClick, userData }) {
  const router = useRouter();
  const surveyContext = useContext(SurveyContext);
  const { deleteSurveyFromDB } = surveyContext;

  const modalContext = useContext(ModalContext);
  const { modalState, showModal } = modalContext;

  const [popup, setPopup] = useState(false);
  const [copyPopup, setCopyPopup] = useState(false);

  const startDeletionOfSurvey = () => {
    setPopup(true);
  };

  const deleteSurvey = async () => {
    const deleted = await deleteSurveyFromDB(surveyData._id, userData.jwt, userData.id);
    router.reload();
    showModal("Survey deleted", "ok");
  };

  const closePopup = () => {
    setPopup(false);
  };

  const textToClipboard = async () => {
    try {
      const copyAttempt = await navigator.clipboard.writeText(`${serverUrl}/survey/${surveyData.uuid}`);

      setCopyPopup(false);
      showModal("Copied to clipboard!", "ok");
    } catch (error) {
      showModal("Copy failed", "fail");
    }
  };

  return (
    <Container>
      {modalState.show === true ? <Modal /> : null}

      {popup ? (
        <PopupBox>
          <Text> Are you sure you want to delete the survey?</Text>
          <ButtonContainer>
            <CircleButton type={"tick"} onClick={(e) => deleteSurvey()} />
            <CircleButton type={"cross"} onClick={closePopup} />
          </ButtonContainer>
        </PopupBox>
      ) : null}

      {copyPopup ? (
        <ConfirmPopup
          text={"Do you want to copy the shareable survey link to the clipboard?"}
          confirm={textToClipboard}
          cancel={setCopyPopup}
        />
      ) : null}

      <InfoContainer onClick={onClick}>
        <Text>{surveyData.title}: </Text>
        <Text>
          {surveyData.replies} {surveyData.replies > 1 ? "replies" : "reply"}
        </Text>
      </InfoContainer>
      <CircleButton type="cross" onClick={startDeletionOfSurvey} />
      <CircleButton type="share" onClick={(e) => setCopyPopup(true)} />
    </Container>
  );
}
