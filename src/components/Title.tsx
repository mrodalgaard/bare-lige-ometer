import React from "react";
import styled from "styled-components";

import { Colors } from "../util/theme";
import { title } from "../util/constants";

const Header = styled.h1`
  font-size: 80px;
  color: ${Colors.Header};
  text-align: center;
`;

const Title = () => {
  return <Header>{title}</Header>;
};

export default Title;
