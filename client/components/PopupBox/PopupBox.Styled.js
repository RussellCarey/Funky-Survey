import styled from "styled-components";
import { theme } from "../../public/Theme/Theme";

// Darkened BG - container for screen
export const DarkBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  width: 100vw;
  height: 100vh;

  background-color: rgba(29, 29, 29, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;
`;

// Popupbox for the info
export const InnerBox = styled.div`
  width: max-content;
  min-width: 40%;
  height: min-content;
  z-index: 500;

  background-color: ${theme.Colors.ui.purple};
  border-radius: ${theme.Border.borderRadius};
  border: solid ${theme.Border.borderThickness}${theme.Colors.border.main};
  box-shadow: 10px 10px 0px ${theme.Colors.shadow.purple};

  padding: ${theme.Spacing.space.xlarge};

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (max-width: 600px) {
    width: 90vw;
    padding: 20px 10px;
  }
`;
