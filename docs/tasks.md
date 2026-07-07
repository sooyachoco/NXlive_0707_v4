# 태스크 — NXlive MVP (v3 · 완전 병합 · MCP 실행용)

> 형식: MCP `tasks-parser` 규격 (`### T{phase}-{seq}: 제목` + `**read**` / `**done**` / `**deps**`).
> 완전 병합 차이: `ut:` done 게이트로 UT 결과(S4/S3)가 Phase 완료 조건에 강제 연결됨.

## Phase 0 — UI 프로토타입 (create-spec Step 2.7, 완료)

### T0-001: React 프로젝트 + Mock + 5페이지 구현
**status**: ☑
**done**:
  - file: frontend/package.json
  - file: frontend/src/App.tsx
  - contains: frontend/src/services/index.ts :: VITE_USE_MOCK

## Phase 1 — 품질 · 접근성 · E2E

### T1-001: 상태 처리 일관화 (로딩/빈/에러)
**status**: ☑
**read**: frontend/src/components/states.tsx
**done**:
  - contains: frontend/src/components/states.tsx :: EmptyState
  - cmd: cd frontend && npm run build

### T1-002: 접근성 — 클릭 전용 요소 0 (네이티브 a/button)
**status**: ☑
**read**: frontend/src/components/StreamerCard.tsx
**done**:
  - contains: frontend/src/components/StreamerCard.tsx :: Link
  - contains: frontend/src/components/Schedule.tsx :: <button

### T1-003: 반응형 (≤960px)
**status**: ☑
**read**: frontend/src/index.css
**done**:
  - contains: frontend/src/index.css :: @media (max-width: 960px)

### T1-004: E2E 스모크 파일
**status**: ☑
**read**: frontend/src/App.tsx
**done**:
  - file: frontend/tests/e2e/smoke.spec.ts

### T1-review: 서브에이전트 리뷰 + AI UT 게이트
**status**: ☑
**skill**: subagent-review
**deps**: T1-001, T1-002, T1-003, T1-004
**done**:
  - cmd: cd frontend && npm run build
  - ut: specs/001-nxlive-mvp/ut/UT_FINDINGS_REPORT.md :: S4=0,S3<=2
