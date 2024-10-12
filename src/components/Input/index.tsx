import { AnalyticsEvent } from 'models/AnalyticsEvent';
import { QueryParameter } from 'models/QueryParameter';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDebouncedCallback } from 'use-debounce';
import { StringParam, useQueryParam } from 'use-query-params';
import { logEvent } from 'util/analytics';

const StyledInput = styled.input`
  display: block;
  margin: 0 auto;
  width: 100%;

  background: transparent;
  border: 0;
  outline: 0;
  font-size: 30px;
  color: ${({ theme }) => theme.colors.header};
  text-align: center;

  &::placeholder {
    opacity: 0.2;
  }
`;

const StyledLabel = styled.label`
  display: none;
`;

export const Input = () => {
  const [title, setTitle] = useState('');
  const [paramTitle, setParamTitle] = useQueryParam(QueryParameter.title, StringParam);

  const inputRef = useRef<HTMLInputElement>(null);

  // Set query parameter title and log event on debounced title change
  const debounceParamTitle = useDebouncedCallback((debouncedTitle: string) => {
    logEvent(AnalyticsEvent.TextChange);
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
      <StyledLabel htmlFor="text">Reason</StyledLabel>
      <StyledInput id="text" ref={inputRef} type="text" placeholder="..." value={title} onChange={onChange} />
    </>
  );
};
