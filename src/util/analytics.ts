import "firebase/analytics";
import { Metric } from "web-vitals";
import firebase from "./firebase";

export enum LogEvent {
  ShareClick = "share_click",
  ValueChange = "value_change",
  TextChange = "text_change",

  GithubLink = "github_link",

  WebVitals = "web_vitals",
}

class Analytics {
  private analytics: firebase.analytics.Analytics | undefined;

  constructor() {
    firebase.analytics.isSupported().then((isSupported) => {
      if (isSupported) {
        this.analytics = firebase.analytics();
      }
    });
  }

  public logEvent = (event: LogEvent, parameters?: any) => {
    this.analytics?.logEvent(event, parameters);
  };

  public sendToAnalytics = ({ id, name, value }: Metric) => {
    this.analytics?.logEvent(LogEvent.WebVitals, {
      id,
      name,
      value: Math.round(name === "CLS" ? value * 1000 : value),
    });
  };
}

export default new Analytics();
