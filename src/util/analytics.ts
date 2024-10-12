import { logEvent as firebaseLogEvent, getAnalytics, isSupported } from 'firebase/analytics';
import { AnalyticsEvent } from 'models/AnalyticsEvent';
import { firebase } from './firebase';

type Parameters = { [key: string]: unknown };

const logEventToFirebase = async (event: AnalyticsEvent, parameters?: Parameters) => {
  if (await isSupported()) {
    firebaseLogEvent(getAnalytics(firebase), event, parameters);
  }
};

export const logEvent = async (event: AnalyticsEvent, parameters?: Parameters) => {
  logEventToFirebase(event, parameters);
};
