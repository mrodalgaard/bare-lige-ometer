import react from '@vitejs/plugin-react-swc';
import { defineConfig, UserConfigExport } from 'vite';
import istanbul from 'vite-plugin-istanbul';
import tsconfigPaths from 'vite-tsconfig-paths';
import packageJson from './package.json';

export default defineConfig(({ command }) => {
  const config: UserConfigExport = {
    plugins: [react(), tsconfigPaths()],
    // Inject environment variables
    define: {
      'import.meta.env.APP_NAME': JSON.stringify(packageJson.name),
      'import.meta.env.APP_DESCRIPTION': JSON.stringify(packageJson.description),
      'import.meta.env.APP_HOMEPAGE': JSON.stringify(packageJson.homepage),
      __APP_NAME__: JSON.stringify(packageJson.name),
      __APP_VERSION__: JSON.stringify(packageJson.version),
      __APP_GIT__: JSON.stringify(packageJson.repository.url),
    },
    server: {
      watch: {
        ignored: ['**/coverage/**'],
      },
      port: 3000,
    },
    preview: {
      port: 3000,
    },
  };

  // Extend with custom configurations for serve command
  if (command === 'serve') {
    return {
      ...config,
      plugins: [...(config.plugins ?? []), istanbul({ include: 'src/*', cypress: true })],
      build: {
        ...config.build,
        sourcemap: true,
      },
    };
  }

  return config;
});
