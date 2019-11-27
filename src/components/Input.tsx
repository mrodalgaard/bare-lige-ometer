import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Colors } from "../util/theme";
import { useQueryParam, StringParam } from "use-query-params";

const StyledInput = styled.input`
  display: block;
  margin: 0 auto;

  background: transparent;
  border: 0;
  outline: 0;
  font-size: 40px;
  color: ${Colors.Header};
  text-align: center;
`;

const Input = () => {
  const [title, setTitle] = useState("");
  const [paramTitle, setParamTitle] = useQueryParam("title", StringParam);

  useEffect(() => {
    if (paramTitle !== undefined) {
      setTitle(paramTitle);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setTitle]);

  useEffect(() => {
    setParamTitle(title);
  }, [title, setParamTitle]);

  return (
    <StyledInput
      type="text"
      value={title}
      onChange={e => setTitle(e.target.value)}
    />
  );
};

export default Input;
