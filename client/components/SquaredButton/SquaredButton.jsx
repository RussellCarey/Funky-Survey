import { Container, Text } from "./SquaredButton.Styled";
import { theme } from "../../public/Theme/Theme";

export default function SquaredButton({ text, margin, onClick, className }) {
  const highlightButton = (e) => {
    if (onClick) {
      onClick();
    }

    //! Shouldnt use this! USE REACT V DOM NOT DOM DOM...
    if (className) {
      // If this button is one of selecting a choice, grab all for THIS question.
      const buttonsSet = document.querySelectorAll(`.A${className}`);

      // Set all buttons background color to null..
      buttonsSet.forEach((bs) => {
        bs.style.backgroundColor = `${theme.Colors.ui.green}`;
      });

      // Set the selected items BG color to red
      const closestButton = e.target.closest(`.A${className}`);
      closestButton.style.backgroundColor = `${theme.Colors.ui.red}`;
    }
  };

  return (
    <Container margin={margin} onClick={(e) => highlightButton(e)} className={"A" + className || "squaredButton"}>
      <Text>{text}</Text>
    </Container>
  );
}
