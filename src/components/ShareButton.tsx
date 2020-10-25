import * as React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { title } from "../util/constants";
import { Colors } from "../util/theme";
import { ShareData } from "../util/types";

const StyledLink = styled.a`
  position: absolute;
  top: 6px;
  left: 12px;

  color: ${Colors.Header};
  cursor: pointer;

  &:hover svg {
    fill: ${Colors.Success};
  }
`;

const CopiedLabel = styled.p`
  margin: 0;
  font-size: 15px;
`;

const ShareButton = () => {
  const [copied, setCopied] = useState(false);

  // Show temporary copied text when flag is toggled
  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 3000);
    }
  }, [copied, setCopied]);

  // Copy to clipboard
  const addToClipboard = (shareData: ShareData): boolean => {
    if (window.navigator?.clipboard?.writeText) {
      window.navigator.clipboard.writeText(shareData.url);
      return true;
    }
    return false;
  };

  // Share using Web Share API
  const webShare = (shareData: ShareData): boolean => {
    const navigator = window.navigator as any;
    if (navigator?.share) {
      try {
        navigator.share(shareData);
        return true;
      } catch {}
    }
    return false;
  };

  const exportButtonClick = () => {
    const shareData = {
      title,
      url: window.location.href,
    };

    if (webShare(shareData) || addToClipboard(shareData)) {
      setCopied(true);
    }
  };

  return (
    <StyledLink onClick={exportButtonClick} aria-label="Share">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="56"
        height="56"
        viewBox="0 0 576 512"
        fill="currentColor"
      >
        <path d="M568.482 177.448L424.479 313.433C409.3 327.768 384 317.14 384 295.985v-71.963c-144.575.97-205.566 35.113-164.775 171.353 4.483 14.973-12.846 26.567-25.006 17.33C155.252 383.105 120 326.488 120 269.339c0-143.937 117.599-172.5 264-173.312V24.012c0-21.174 25.317-31.768 40.479-17.448l144.003 135.988c10.02 9.463 10.028 25.425 0 34.896zM384 379.128V448H64V128h50.916a11.99 11.99 0 0 0 8.648-3.693c14.953-15.568 32.237-27.89 51.014-37.676C185.708 80.83 181.584 64 169.033 64H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48v-88.806c0-8.288-8.197-14.066-16.011-11.302a71.83 71.83 0 0 1-34.189 3.377c-7.27-1.046-13.8 4.514-13.8 11.859z"></path>
      </svg>
      {copied && <CopiedLabel>copied</CopiedLabel>}
    </StyledLink>
  );
};

export default ShareButton;
