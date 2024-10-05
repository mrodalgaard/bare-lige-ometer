import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import packageJson from './package.json';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  define: {
    'import.meta.env.APP_NAME': JSON.stringify(packageJson.name),
    'import.meta.env.APP_DESCRIPTION': JSON.stringify(packageJson.description),
    'import.meta.env.APP_HOMEPAGE': JSON.stringify(packageJson.homepage),
    __APP_NAME__: JSON.stringify(packageJson.name),
    __APP_VERSION__: JSON.stringify(packageJson.version),
    __APP_GIT__: JSON.stringify(packageJson.repository.url),
  },
});
