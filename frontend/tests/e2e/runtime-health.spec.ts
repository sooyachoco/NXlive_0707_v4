import { test, expect, type ConsoleMessage, type Request } from '@playwright/test';

// 런타임 헬스체크 — 빌드 통과 ≠ 런타임 통과 갭 차단 (subagent-review Step 2-0 게이트).
// 인증 없는 공개 라우트만 대상. 각 라우트 방문 시 콘솔 에러 0건 + 네트워크 4xx/5xx 0건.
// 실행: dev 서버(:8010) 자동 기동(playwright webServer) 후 `npx playwright test runtime-health`.

// spec.md/App.tsx 기준 공개 라우트 (동적 파라미터는 Mock 데이터 첫 항목 사용)
const ROUTES = ['/', '/clips', '/search', '/search?q=메이플', '/channel/c1', '/watch/s1'];

for (const route of ROUTES) {
  test(`runtime-health: ${route} — 콘솔/네트워크 에러 0건`, async ({ page }) => {
    const consoleErrors: string[] = [];
    const failedResponses: string[] = [];

    page.on('console', (msg: ConsoleMessage) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (err: Error) => {
      consoleErrors.push(err.message);
    });
    page.on('requestfailed', (req: Request) => {
      // favicon 등 부수 리소스 실패는 무시 (문서 라우트 검증이 목적)
      const url = req.url();
      if (!/favicon|\.map$/.test(url)) failedResponses.push(`${req.method()} ${url} — ${req.failure()?.errorText}`);
    });
    page.on('response', (res) => {
      const status = res.status();
      const url = res.url();
      if (status >= 400 && !/favicon|\.map$/.test(url)) {
        failedResponses.push(`${status} ${url}`);
      }
    });

    await page.goto(route, { waitUntil: 'networkidle' });
    // 앱 셸이 렌더됐는지 최소 확인 (라우트가 흰 화면이 아님)
    await expect(page.locator('.app')).toBeVisible();

    expect(consoleErrors, `콘솔 에러: ${consoleErrors.join(' | ')}`).toHaveLength(0);
    expect(failedResponses, `네트워크 실패: ${failedResponses.join(' | ')}`).toHaveLength(0);
  });
}
