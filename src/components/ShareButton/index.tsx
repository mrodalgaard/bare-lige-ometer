import { Button } from 'components/Button';
import { AnalyticsEvent } from 'models/AnalyticsEvent';
import { Share } from 'react-feather';
import { logEvent } from 'util/analytics';
import { APP_TITLE } from 'util/constants';

export const ShareButton = () => {
  // Copy to clipboard
  const addToClipboard = (shareData: ShareData): boolean => {
    if (shareData.url && navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(shareData.url);
      return true;
    }
    return false;
  };

  // Share using Web Share API
  const webShare = async (shareData: ShareData): Promise<boolean> => {
    if (navigator?.share && navigator?.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
        return true;
      } catch (error) {
        if (error instanceof Error && error.toString().includes('AbortError')) {
          console.log('Web Share API cancelled');
        } else {
          console.error('Web Share API failed');
        }
      }
    }
    return false;
  };

  // Add to clipboard and share using Web Share API
  const exportButtonClick = () => {
    logEvent(AnalyticsEvent.ShareClick);

    const shareData: ShareData = {
      title: APP_TITLE,
      url: location.href,
    };

    addToClipboard(shareData);
    webShare(shareData);
  };

  return (
    <Button clickedText="copied" onClick={exportButtonClick} aria-label="Share">
      <Share size={56} />
    </Button>
  );
};
