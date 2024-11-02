import registerCodeCoverageTasks from "@cypress/code-coverage/task";
import { defineConfig } from "cypress";

export default defineConfig({
  reporter: "junit",
  reporterOptions: {
    mochaFile: "coverage/test-results.xml",
  },

  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents: (on, config) => {
      on("before:browser:launch", (browser = {}, launchOptions) => {
        // Force dark mode and open devtools in Chrome
        if (browser.family === "chromium") {
          launchOptions.args.push("--force-dark-mode=true");
          launchOptions.args.push("--auto-open-devtools-for-tabs");
        }
        return launchOptions;
      });

      registerCodeCoverageTasks(on, config);
      return config;
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    setupNodeEvents: (on, config) => {
      registerCodeCoverageTasks(on, config);
      return config;
    },
  },
});
