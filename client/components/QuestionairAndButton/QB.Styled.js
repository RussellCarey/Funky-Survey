import styled from "styled-components";
import { theme } from "../../public/Theme/Theme";

export const Container = styled.div`
  width: 90vw;
  height: 50px;
  display: flex;

  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;

  margin: ${theme.Spacing.space.large} 0;

  @media (max-width: 1000px) {
    width: 100vw;
    //! Padding for each moobly
    padding: 0 ${theme.Spacing.space.small};
    margin: 18px;
  }
`;

// The tab that holds the surveys key information
export const InfoContainer = styled.div`
  width: 85%;
  height: 100%;

  background-color: ${theme.Colors.ui.purple};
  border-radius: ${theme.Border.borderRadius};
  border: solid ${theme.Border.borderThickness}${theme.Colors.border.main};
  box-shadow: 10px 10px 0px ${theme.Colors.shadow.purple};

  padding: ${theme.Spacing.space.large};

  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 22px;

  transition: 0.2s all;

  margin-right: ${theme.Spacing.space.medium};

  &:hover {
    cursor: pointer;
    transform: scale(102%);
    box-shadow: 12px 12px 1px ${theme.Colors.shadow.purple};
  }

  @media (max-width: 1000px) {
    padding: ${theme.Spacing.space.medium};
    width: 75%;
    height: min-content;
    margin-right: ${theme.Spacing.space.small};
    font-size: 16px;
  }
`;

// Panel Text
export const Text = styled.p`
  color: white;
  font-weight: bold;
  font-size: 20px;

  white-space: initial;
  text-align: center;

  @media (max-width: 350px) {
    font-size: 16px;
    font-size: ${(props) => (props.mobileSmall ? "12px" : null)};
  }
`;
