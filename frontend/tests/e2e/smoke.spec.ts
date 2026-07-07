import { test, expect } from '@playwright/test';

// NXlive MVP 스모크 — 5개 페이지 라우팅 + 발견→시청 핵심 플로우 + 접근성(키보드)
// 실행: dev 서버(npm run dev, :8010) 기동 후 `npx playwright test`

test('홈 렌더 + 4개 발견 섹션', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: '실시간 라이브' })).toBeVisible();
  await expect(page.getByRole('heading', { name: /인기 스트리머/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: /오늘의 편성표/ })).toBeVisible();
});

test('발견 → 시청 (1클릭) + 채팅/플레이어', async ({ page }) => {
  await page.goto('/');
  await page.locator('.live-card').first().click();
  await expect(page).toHaveURL(/\/watch\//);
  await expect(page.locator('.player')).toBeVisible();
  await expect(page.locator('.chat')).toBeVisible();
});

test('클립 필터 + 검색 결과', async ({ page }) => {
  await page.goto('/clips');
  await expect(page.locator('.live-card').first()).toBeVisible();
  await page.goto('/search?q=' + encodeURIComponent('메이플'));
  await expect(page.getByText(/검색 결과/)).toBeVisible();
});

test('채널 페이지 탭', async ({ page }) => {
  await page.goto('/channel/c1');
  await expect(page.getByRole('button', { name: /방송/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /클립/ })).toBeVisible();
});

test('접근성 — 스트리머 아바타/편성표가 키보드 포커스 가능 (UT F-001 회귀)', async ({ page }) => {
  await page.goto('/');
  // 스트리머 아바타는 링크(a), 편성표 프로그램은 button — 키보드 접근 가능해야 함
  const streamerLink = page.locator('.streamer-card a.avatar').first();
  await expect(streamerLink).toHaveAttribute('href', /\/channel\//);
  const progBtn = page.locator('.sched .prog').first();
  await expect(progBtn).toHaveJSProperty('tagName', 'BUTTON');
});
