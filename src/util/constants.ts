import { Colors } from "./theme";

export const title = process.env.REACT_APP_WEBSITE_NAME ?? "";

export const meterColors = [Colors.Success, Colors.Warning, Colors.Error];

export const githubLink = process.env.REACT_APP_GIT ?? "";
