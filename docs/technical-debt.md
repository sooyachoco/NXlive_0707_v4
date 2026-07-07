# Technical Debt — NXlive MVP

## Phase 1 Advisory — 2026-07-07
> 프로덕션/실 API 전환 전 수정 권장. Phase 1 리뷰(6명 + 재리뷰 3명)에서 도출. Blocker/Required 없음(전부 Step 4에서 해소).

| 리뷰어 | 파일:줄 | 내용 | 수정 방안 |
|---|---|---|---|
| Architecture | pages/{Home,Clips,Watch,Channel}.tsx | load() 함수 패턴 4곳 반복 (setError→setX(null)→getX().then.catch) | 페이지 증가 시 `useAsync<T>(fetcher)` 훅으로 추출 |
| Architecture | pages/Search.tsx:18-25 | 에러 재시도 로직이 useEffect·onRetry에 인라인 중복 (다른 페이지는 load 재사용) | `useCallback([q])`로 감싸 공유 |
| Accessibility | index.css `.live-card .game` / `.rank .row .game` | 11px 볼드 소형 텍스트 --primary(#0a74ff) on #fff ≈ 3.6:1 (4.5:1 미달) | --primary-hover(#0056c7, 7.6:1) 적용 |
| Accessibility | index.css `.follow` | 팔로우 버튼 --primary on --primary-weak ≈ 3.4:1 | --primary-hover 적용 + hover 배경 상향 |
| Accessibility | index.css `.search` (resting) | placeholder/텍스트 --text-sub on --bc-100 = 4.02:1 (focus 시 #fff에서 4.76:1 통과) | 검색 배경을 #fff로 통일 시 완전 해소 |
| Accessibility | index.css `.chat .ch-input button` 등 | 주요 액션 터치 타깃 44px 미만 (WCAG 2.2 최소 24px는 충족) | min-height:44px |
| Accessibility | Watch.tsx `.chat .ch-body` | 실시간 채팅 자동 갱신에 aria-live 없음 (스크린리더 미고지) | aria-live="polite" aria-atomic="false" |
| Accessibility | Schedule.tsx `.sname .lv` | 편성표 "방송 중" 표시가 순수 빨간 점(색상 전용, 대체텍스트 없음) | aria-label="방송 중" 또는 시각적 숨김 텍스트 |
| Feature/Arch | Sidebar.tsx:15,18 | '게임'/'e스포츠'가 match 없이 /search로 수렴 → active 하이라이트 어긋남 | Phase 2에서 /games 라우트 신설 시 match 지정 (F-101) |
| Feature | store/useAppStore.ts query | Zustand query 상태가 write만 되고 read 안 됨 (URL이 SSOT) | query 제거 또는 TopBar 초기값 동기화 |
| Spec/A11y | states.tsx GridSkeleton | 로딩 스켈레톤에 role="status" aria-busy 없음 | 스켈레톤 래퍼에 role="status" aria-label="불러오는 중" |
| Arch | states.tsx / index.css | 스켈레톤 높이 158 하드코딩 이원화 (states.tsx 인라인 + .live-card .thumb) | --thumb-h CSS 변수로 단일화 |
| Spec | tests/e2e/smoke.spec.ts:25 | 검색 결과 어서션이 빈 상태 문구에도 매칭 가능 (견고성 낮음) | `.live-card` 가시성 또는 "N건" 매칭으로 강화 |
