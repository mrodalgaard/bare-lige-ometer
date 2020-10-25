import "firebase/analytics";
import firebase from "./firebase";

export enum LogEvent {
  ShareClick = "share_click",
  ValueChange = "value_change",
  TextChange = "text_change",

  GithubLink = "github_link",
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
}

export default new Analytics();
