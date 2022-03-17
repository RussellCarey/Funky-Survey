import { InnerBox, DarkBackground } from "./PopupBox.Styled";

export default function PopupBox({ children }) {
  return (
    <DarkBackground>
      <InnerBox>{children}</InnerBox>
    </DarkBackground>
  );
}
