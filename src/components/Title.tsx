import React from "react";
import styled from "styled-components";

import { Colors } from "../util/theme";

const Header = styled.h1`
  font-size: 80px;
  color: ${Colors.Header};
  text-align: center;
`;

const Title = () => {
  return <Header>BARE-LIGE-O'METER</Header>;
};

export default Title;
