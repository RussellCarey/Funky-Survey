import styled from "styled-components";
import { theme } from "../../public/Theme/Theme";

// Whole button
export const Container = styled.div`
  width: 60px !important;
  min-width: 60px;
  height: 60px !important;
  min-height: 60px;

  margin: ${(props) => props.margin || "0 5px"};

  background-color: ${theme.Colors.ui.green};
  border-radius: 50%;
  border: solid ${theme.Border.borderThickness}${theme.Colors.border.main};
  box-shadow: 5px 5px 0 ${theme.Colors.shadow.purple};

  color: white;
  font-size: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: 0.1s all;

  @media (max-width: 600px) {
    width: 50px !important;
    min-width: 50px;
    height: 50px !important;
    min-height: 50px;
  }

  &:hover {
    cursor: pointer;
    transform: scale(105%);
    box-shadow: 6px 6px 1px ${theme.Colors.shadow.purple};
  }
`;

// SBG in the center
export const SVG = styled.img`
  width: 50%;
  height: 50%;
  color: white;
`;
