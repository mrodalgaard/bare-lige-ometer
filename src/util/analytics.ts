import { logEvent as firebaseLogEvent, getAnalytics, isSupported, setUserProperties } from 'firebase/analytics';
import { AnalyticsEvent } from 'models/AnalyticsEvent';
import { firebase } from './firebase';
import { isDev } from './isDev';

type Parameters = { [key: string]: unknown };

export const logEvent = async (event: AnalyticsEvent, parameters?: Parameters) => {
  if (!isDev && (await isSupported())) {
    firebaseLogEvent(getAnalytics(firebase), event, parameters);
  }
};

export const setUserProperty = async (name: AnalyticsEvent, value: unknown) => {
  if (!isDev && (await isSupported())) {
    setUserProperties(getAnalytics(firebase), { [name]: value });
  }
};
