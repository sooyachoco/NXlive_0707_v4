# NXlive — 게임 라이브 스트리밍 데모 (Phase 1)

넥슨 게임 라이브 스트리밍 시제품(Mock 데이터로 동작하는 프론트엔드 전용 데모)입니다.
React 19 + Vite + TypeScript, 로그인 없음, 가짜 데이터로 완결됩니다.

## 🔗 웹페이지 (GitHub Pages)

- **앱**: https://sooyachoco.github.io/NXlive_0707_v4/
- **Phase 1 실행 대시보드**: https://sooyachoco.github.io/NXlive_0707_v4/dashboard.html

> `main` 브랜치에 push하면 GitHub Actions가 자동 빌드·배포합니다.
> 최초 1회는 저장소 **Settings → Pages → Source: GitHub Actions** 확인이 필요할 수 있습니다.

## 화면 (5개)

| 경로 | 화면 |
| --- | --- |
| `/` | 홈 — 실시간 라이브 · 인기 스트리머 · 오늘의 편성표 |
| `/watch/:id` | 시청 — 플레이어 + 실시간 채팅 |
| `/channel/:id` | 채널 — 방송/클립 탭 |
| `/clips` | 클립 — 게임별 필터 |
| `/search` | 통합 검색 |

## 로컬 실행

```bash
cd frontend
npm install
npm run dev      # http://localhost:8010
```

Mock 데이터가 기본 ON(`VITE_USE_MOCK !== 'false'`)이라 백엔드 없이 바로 동작합니다.

## 기술 스택

React 19 · Vite 6 · TypeScript · Tailwind v4 · Zustand · react-router-dom v7 · NX Basic 라이트 토큰

## 품질 (Phase 1)

- 상태 처리 3종(로딩/빈/에러) 일관화 · 접근성(클릭 전용 요소 0) · 반응형(≤960px)
- E2E 11건 통과(smoke 5 + runtime-health 6) — 자세한 결과는 대시보드 참고
