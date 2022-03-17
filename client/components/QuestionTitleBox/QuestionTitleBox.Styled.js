import styled from "styled-components";
import { theme } from "../../public/Theme/Theme";

// The tab that holds the surveys key information
export const Container = styled.div`
  width: 100%;
  height: min-content;

  background-color: ${theme.Colors.ui.purple};
  border-radius: ${theme.Border.borderRadius};
  border: solid ${theme.Border.borderThickness}${theme.Colors.border.main};
  box-shadow: 10px 10px 0px ${theme.Colors.shadow.purple};

  padding: ${theme.Spacing.space.medium} ${theme.Spacing.space.large};

  display: flex;
  justify-content: space-between;

  margin: ${(props) => props.margin};

  @media (max-width: 600px) {
    width: 100%;
  }
`;

// Texteieio
export const Text = styled.h3`
  color: white;
  font-weight: bold;
  font-size: 20px;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;
