import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { StringParam, useQueryParam } from "use-query-params";
import { Colors } from "../util/theme";
import { QueryParameter } from "../util/types";

const StyledInput = styled.input`
  display: block;
  margin: 0 auto;
  width: 100%;

  background: transparent;
  border: 0;
  outline: 0;
  font-size: 30px;
  color: ${Colors.Header};
  text-align: center;
`;

const Input = () => {
  const [title, setTitle] = useState("");
  const [paramTitle, setParamTitle] = useQueryParam(
    QueryParameter.title,
    StringParam
  );

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Set input title value to query parameter title
    if (paramTitle !== undefined && paramTitle !== null) {
      setTitle(paramTitle);
    }
    // Focus input if title is not set
    else {
      inputRef?.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setTitle]);

  // Set query parameter title to input title value
  useEffect(() => {
    setParamTitle(title || undefined);
  }, [title, setParamTitle]);

  return (
    <StyledInput
      ref={inputRef}
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
};

export default Input;
