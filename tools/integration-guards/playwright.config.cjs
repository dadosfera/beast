const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: '.',
  testMatch: 'typography.spec.cjs',
  forbidOnly: true,
  retries: 0,
  workers: 1,
  timeout: 15000,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    browserName: 'chromium',
    baseURL: 'http://127.0.0.1:4174',
    viewport: { width: 1440, height: 1100 },
    serviceWorkers: 'block',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    launchOptions: process.env.BEAST_CHROMIUM_EXECUTABLE
      ? { executablePath: process.env.BEAST_CHROMIUM_EXECUTABLE }
      : {},
  },
  webServer: {
    command: 'node server.cjs',
    url: 'http://127.0.0.1:4174/guidelines/typography-evaluation.html',
    reuseExistingServer: false,
    timeout: 10000,
  },
});
