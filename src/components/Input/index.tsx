import { AppContext } from 'contexts/AppContext';
import { AnalyticsEvent } from 'models/AnalyticsEvent';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDebouncedCallback } from 'use-debounce';
import { logEvent } from 'util/analytics';

const StyledTextArea = styled.textarea`
  display: block;
  margin: 0 auto;
  width: 100%;

  background: transparent;
  border: 0;
  outline: none;
  resize: none;
  overflow-y: hidden;
  text-align: center;
  ${({ theme }) => theme.typography('input')};
  color: ${({ theme }) => theme.colors.primary};

  &::placeholder {
    opacity: 0.7;
  }
`;

const StyledLabel = styled.label`
  display: none;
`;

export const Input = () => {
  const [text, setText] = useState('');
  const { title, setTitle } = useContext(AppContext);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Set query parameter title and log event on debounced title change
  const debounceParamTitle = useDebouncedCallback((debouncedTitle: string) => {
    logEvent(AnalyticsEvent.TextChange, { text: debouncedTitle });
    setTitle(debouncedTitle || undefined);
  }, 500);

  useEffect(() => {
    // Set text area value to query parameter title
    if (title !== undefined && title !== null) {
      setText(title);
    }
    // Focus text area if title is not set
    else {
      textAreaRef?.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto resize textarea height
  useEffect(() => {
    if (textAreaRef?.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    }
  }, [text]);

  // Use debounce to update title
  useEffect(() => {
    debounceParamTitle.callback(text);
    return debounceParamTitle.cancel;
  }, [text, debounceParamTitle]);

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <div>
      <StyledLabel htmlFor="text">Reason</StyledLabel>
      <StyledTextArea id="text" ref={textAreaRef} placeholder="..." value={text} onChange={onChange} />
    </div>
  );
};
