import { defineConfig, devices } from '@playwright/test';

// dev 서버(:8010)를 자동 기동해 e2e 스모크 실행.
// 최초 1회 `npx playwright install chromium` 필요.
export default defineConfig({
  testDir: './tests/e2e',
  use: { baseURL: 'http://localhost:8010', viewport: { width: 1440, height: 900 } },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:8010',
    reuseExistingServer: true,
    timeout: 60000,
  },
});
