import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

type ButtonType = {
  icon: "play" | "pause" | "stop";
};

const BaseButton = css`
  border-radius: 4px;
  padding: 7px 15px;
  margin: 0 5px;
  background-color: white;
  color: black;
  cursor: pointer;
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
  }
`;

const ButtonWrapper = styled.button`
  ${BaseButton}
`;

export const ButtonIcon: React.FC<ButtonType> = ({ icon }) => {
  return (
    <ButtonWrapper>
      <img src={`src/img/${icon}.png`} />
    </ButtonWrapper>
  );
};
