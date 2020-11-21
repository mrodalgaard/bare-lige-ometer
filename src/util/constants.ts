import theme from "./theme";

export const title = process.env.REACT_APP_WEBSITE_NAME ?? "";

export const meterColors = [theme.success, theme.warning, theme.error];

export const githubLink = process.env.REACT_APP_GIT ?? "";
