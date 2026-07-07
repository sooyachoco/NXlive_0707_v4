# 구현 계획 — NXlive MVP

## 아키텍처

```
[React SPA] ── src/services (USE_MOCK 게이트) ──┬── src/mocks (정적 데이터, 현재)
                                                 └── /api/* (Phase 1 실제 API, 미래)
상태: Zustand(useAppStore) — 팔로우/검색어 (클라이언트 상태)
라우팅: react-router-dom — /, /watch/:id, /channel/:id, /clips, /search
```

- 레이어: 페이지(pages/) → 컴포넌트(components/) → 서비스(services/) → 데이터(mocks/)
- 레이어 경계 직접 호출 금지 (페이지가 mocks 직접 접근 금지 — services 경유)

## Phase 계획

### Phase 0 — UI 프로토타입 (✅ 완료, create-spec Step 2.7)
- React 프로젝트 + Mock 레이어 + 5개 페이지 + 라우팅 + Zustand. build 통과.

### Phase 1 — 완성도/품질 (Mock 유지)
> 백엔드가 없으므로 Phase 1은 "실제 API 교체" 대신 **품질·접근성·상태처리·테스트**에 집중.
- P1-1 공통 상태 처리 정리 (로딩 스켈레톤/빈상태/에러 일관화)
- P1-2 접근성 보강 (키보드 내비, aria, 포커스 링, 대비 검증)
- P1-3 반응형 검증 (≤960px 사이드바/편성표/그리드)
- P1-4 E2E 스모크 (5개 페이지 라우팅 + 발견→시청 플로우) — Playwright
- P1-5 성능 (초기 로드, 라우트 코드 스플리팅 검토)
- P1-review 서브에이전트 리뷰

### Phase 2 — (범위 외/후속) 실제 API 연동
- `VITE_USE_MOCK=false` + 백엔드 계약(api-spec.yaml) 구현 시 진행. 현재 MVP 범위 아님.

## 위험/가정
- 실제 스트리밍/영상 없음 → 플레이어는 Mock 플레이스홀더로 유지.
- 편성표/채팅은 Mock 시뮬레이션 (실시간 데이터 소스 없음).
