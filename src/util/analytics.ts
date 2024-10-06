import { logEvent as firebaseLogEvent, getAnalytics, isSupported } from 'firebase/analytics';
import { Metric } from 'web-vitals';
import { firebase } from './firebase';

export enum AnalyticsEvent {
  ShareClick = 'share_click',
  ValueChange = 'value_change',
  TextChange = 'text_change',

  GithubLink = 'github_link',

  WebVitals = 'web_vitals',
}

type Parameters = { [key: string]: unknown };

const logEventToFirebase = async (event: AnalyticsEvent, parameters?: Parameters) => {
  if (await isSupported()) {
    firebaseLogEvent(getAnalytics(firebase), event, parameters);
  }
};

const logEvent = async (event: AnalyticsEvent, parameters?: Parameters) => {
  logEventToFirebase(event, parameters);
};

const logWebVitals = async ({ id, name, value }: Metric) => {
  logEventToFirebase(AnalyticsEvent.WebVitals, {
    id,
    name,
    value: Math.round(name === 'CLS' ? value * 1000 : value),
  });
};

export { logEvent, logWebVitals };
