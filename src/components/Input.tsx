import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDebouncedCallback } from "use-debounce/lib";
import { StringParam, useQueryParam } from "use-query-params";
import analytics, { LogEvent } from "util/analytics";
import { QueryParameter } from "util/types";

const StyledInput = styled.input`
  display: block;
  margin: 0 auto;
  width: 100%;

  background: transparent;
  border: 0;
  outline: 0;
  font-size: 30px;
  color: ${({ theme }) => theme.header};
  text-align: center;
`;

const StyledLabel = styled.label`
  display: none;
`;

const Input = () => {
  const [title, setTitle] = useState("");
  const [paramTitle, setParamTitle] = useQueryParam(
    QueryParameter.title,
    StringParam
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Set query parameter title and log event on debounced title change
  const debounceParamTitle = useDebouncedCallback((debouncedTitle: string) => {
    analytics.logEvent(LogEvent.TextChange);
    setParamTitle(debouncedTitle);
  }, 500);

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
  }, []);

  // Use debounce to update title dependencies
  useEffect(() => {
    debounceParamTitle.callback(title);
    return debounceParamTitle.cancel;
  }, [title, debounceParamTitle]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <>
      <StyledLabel htmlFor="text">CHANGE TEXT</StyledLabel>
      <StyledInput
        id="text"
        ref={inputRef}
        type="text"
        value={title}
        onChange={onChange}
      />
    </>
  );
};

export default Input;
