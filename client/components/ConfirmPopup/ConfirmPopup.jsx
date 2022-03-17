import PopupBox from "../PopupBox/PopupBox";
import { ButtonContainer } from "../Maker/styled";
import CircleButton from "../CircleButton/CircleButton";
import { Text } from "./ConfirmPopup.Styled";

export default function ConfirmPopup({ text, confirm, cancel }) {
  return (
    <PopupBox>
      <Text>{text}</Text>
      <ButtonContainer>
        <CircleButton type={"tick"} onClick={(e) => confirm()} />
        <CircleButton type={"cross"} onClick={(e) => cancel(false)} />
      </ButtonContainer>
    </PopupBox>
  );
}
