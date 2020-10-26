import React from "react";
import styled from "styled-components";
import { title } from "../util/constants";
import { Colors } from "../util/theme";

const Header = styled.h1`
  font-size: 80px;
  color: ${Colors.Header};
  text-align: center;
  margin-bottom: 10px;
`;

const Title = () => {
  return (
    <header>
      <Header>{title}</Header>
    </header>
  );
};

export default Title;
