import { logEvent as firebaseLogEvent, getAnalytics, isSupported, setUserProperties } from 'firebase/analytics';
import { AnalyticsEvent } from 'models/AnalyticsEvent';
import { firebase } from './firebase';

type Parameters = { [key: string]: unknown };

export const logEvent = async (event: AnalyticsEvent, parameters?: Parameters) => {
  if (await isSupported()) {
    firebaseLogEvent(getAnalytics(firebase), event, parameters);
  }
};

export const setUserProperty = async (name: AnalyticsEvent, value: unknown) => {
  if (await isSupported()) {
    setUserProperties(getAnalytics(firebase), { [name]: value });
  }
};
