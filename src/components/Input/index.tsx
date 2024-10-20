import { AppContext } from 'contexts/AppContext';
import { AnalyticsEvent } from 'models/AnalyticsEvent';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDebouncedCallback } from 'use-debounce';
import { logEvent } from 'util/analytics';

const StyledInput = styled.input`
  display: block;
  margin: 0 auto;
  width: 100%;

  background: transparent;
  border: 0;
  outline: 0;
  font-size: 30px;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;

  &::placeholder {
    opacity: 0.2;
  }
`;

const StyledLabel = styled.label`
  display: none;
`;

export const Input = () => {
  const [input, setInput] = useState('');
  const { title, setTitle } = useContext(AppContext);

  const inputRef = useRef<HTMLInputElement>(null);

  // Set query parameter title and log event on debounced title change
  const debounceParamTitle = useDebouncedCallback((debouncedTitle: string) => {
    logEvent(AnalyticsEvent.TextChange);
    setTitle(debouncedTitle || undefined);
  }, 500);

  useEffect(() => {
    // Set input title value to query parameter title
    if (title !== undefined && title !== null) {
      setInput(title);
    }
    // Focus input if title is not set
    else {
      inputRef?.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Use debounce to update title dependencies
  useEffect(() => {
    debounceParamTitle.callback(input);
    return debounceParamTitle.cancel;
  }, [input, debounceParamTitle]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <>
      <StyledLabel htmlFor="text">Reason</StyledLabel>
      <StyledInput id="text" ref={inputRef} type="text" placeholder="..." value={input} onChange={onChange} />
    </>
  );
};
