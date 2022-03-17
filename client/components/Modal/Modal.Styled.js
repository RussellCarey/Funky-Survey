import styled from "styled-components";
import { theme } from "../../public/Theme/Theme";

// COntainer for the nav bar
export const Container = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;

  z-index: 9000;

  max-width: 300px;
  height: min-content;
  padding: ${theme.Spacing.space.large};

  background-color: ${(props) => (props.type === "ok" ? theme.Colors.ui.green : theme.Colors.ui.red)};
  border: solid ${theme.Border.borderThickness}${theme.Colors.border.main};
  border-radius: 15px;
  padding: ${theme.Spacing.space.medium}${theme.Spacing.space.xxlarge};

  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    padding: ${theme.Spacing.space.small}${theme.Spacing.space.medium};
  }
`;

// All text
export const Text = styled.p`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;
