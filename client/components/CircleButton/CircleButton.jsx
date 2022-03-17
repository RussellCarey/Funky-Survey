import { Container, SVG } from "./CircleButton.styled";

export default function CircleButton({ type, onClick }) {
  return (
    <Container onClick={onClick}>
      {type === "tick" ? <SVG src="/svg/tick.svg" alt="confirm" /> : null}

      {type === "cross" ? <SVG src="/svg/cross.svg" alt="cancel" /> : null}

      {type === "plus" ? <SVG src="/svg/plus.svg" alt="add" /> : null}

      {type === "share" ? <SVG src="/svg/share.svg" alt="share" /> : null}

      {type === "next" ? <SVG src="/svg/next.svg" alt="next" /> : null}
    </Container>
  );
}
