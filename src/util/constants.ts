import { theme } from 'contexts/ThemeContext';

export const APP_TITLE = "BARE-LIGE-O'METER";

export const APP_VERSION = __APP_VERSION__ ?? '';

export const BANNER_SIZE = '80px';

export const METER_COLORS = [theme.colors.success, theme.colors.warning, theme.colors.error];

export const GITHUB_LINK = __APP_GIT__ ?? '';
