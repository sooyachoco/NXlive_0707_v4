# 기술 결정 로그 — NXlive MVP

| ID | 항목 | 결정 | 근거 | 상태 |
|---|---|---|---|---|
| D-1 | 프론트엔드 스택 | React 19 + Vite + TS + Tailwind v4 | 👤 사용자 확정 — Mock MVP 프론트 전용 | ✅ |
| D-2 | 백엔드 | 없음 (Mock 데이터) | 🤖 MVP 범위 — `src/mocks` 정적 데이터로 완결 | ✅ |
| D-3 | 인증 | none | 👤 PRD — 익명 열람, 로그인 없음 | ✅ |
| D-4 | 상태 관리 | Zustand | 🤖 엔티티 6개(3~6 구간) → Zustand. 서버상태 없음 → React Query 불필요 | ✅ |
| D-5 | 라우팅 | react-router-dom v7 | 🤖 SPA 5개 페이지 표준 | ✅ |
| D-6 | 디자인 시스템 | NX Basic 1.0v 토큰 (라이트) | 👤 확정안(D+C+라이트) — nxbasic-mcp 토큰 사용 | ✅ |
| D-7 | 폰트 | Pretendard (CDN) | 🤖 NX Basic 표준 한글 폰트 | ✅ |
| D-8 | Mock↔API 전환 | `VITE_USE_MOCK` 게이트 + `src/services` | 🤖 Phase 1 실제 API 교체 대비 | ✅ |
| D-9 | LIVE 상태색 | `#e5484d` (관용 레드) | 🤖 정책 자동선택 — nxbasic-mcp 토큰 조회 결과 상태색 미정의 확인 → 관용 레드 폴백 (NX Basic 확장 시 교체) | ✅ |
| D-10 | HTTPS/Caddy 로컬 인프라 | 생략 | 👤 인증·쿠키·백엔드 없음 → 불필요 | ✅ |

> 🔴 외부 연동 없음 → integration-registry 비어 있음. collect-prerequisites 불필요.
