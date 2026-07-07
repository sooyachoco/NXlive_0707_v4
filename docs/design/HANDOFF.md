# 개발 핸드오프 — NXlive MVP (v2)

> design-handoff · 2026-07-06 · UT 통과(S4=0, S3=0). 새 결정 없음 — 확정·검증된 것만.
> 입력: spec.md · scenario.md · reference-board.md · design-direction.md · UT_FINDINGS_REPORT.md · frontend/

## 1. 범위
- 넥슨 게임 라이브 스트리밍 웹 MVP (Mock, 인증 없음). 라우트: `/`, `/watch/:streamId`, `/channel/:channelId`, `/clips`, `/search`.
- 스택: React 19 + Vite + TS + Tailwind · Zustand · react-router v7 · Pretendard.

## 2. 레이아웃
- 좌측 사이드바 210px + 콘텐츠, max-width 1440. 홈: 히어로+랭킹 → 실시간 3열 → 스트리머 5열 → 편성표(TV-guide). 시청: 콘텐츠+채팅 340 2컬럼.

## 3. 디자인 토큰 (NX Basic 라이트)
Primary `#0a74ff`(pc-800) / hover `#0056c7` / 강조 `#ecf1f9` / 텍스트 `#17191c` / 서브 `#747a86` / 보더 `#d2d6e0` / 배경 `#f7f8fa` / LIVE `#e5484d` / Pretendard · type-default.

## 4. 컴포넌트 (NX Basic 매핑)
Search/TextField(검색) · Tab(채널/검색 탭) · Tag(필터 칩) · Card(테두리 제거 변형, LiveCard) · Button(팔로우/CTA) · Badge(LIVE) · Notification(빈/에러).

## 5. 인터랙션·상태
- 카드/히어로 클릭→`/watch/:id`(1클릭). 채팅 2.6s 자동+입력. 팔로우 Zustand 토글. 탭/필터/검색.
- 상태: 로딩=GridSkeleton, 빈/실패=EmptyState (5화면 커버).

## 6. 반응형
≥961px 사이드바 고정 / ≤960px 수평화, 그리드 2열, 편성표 가로스크롤 / reduced-motion 대응.

## 7. 접근성 (✅ 설계 선반영 — v1 F-001 예방)
- **모든 클릭 요소 네이티브 `<a>/<button>`** (스트리머 아바타=Link, 편성표=button) → 키보드 접근 100%, 클릭 전용 div 0.
- `:focus-visible` 포커스 링, aria-label, 대비 AA.

## 8. 모션
LIVE dot 펄스, 카드 hover translateY, 스켈레톤 shimmer, 트랜지션 .15s.

## 9. 잔여 백로그 (UT)
| ID | Sev | 내용 | 시점 |
|---|---|---|---|
| F-101 | S2 | 게임 카테고리 목록 페이지 | Phase 2 |
| F-102 | S1 | 실제 썸네일 이미지 | Phase 2 |

## 10. 에셋
인라인 SVG 8종(`components/icons.tsx`), CSS 그라디언트 썸네일/아바타(Mock), Pretendard CDN, Mock 데이터 `src/mocks/data.ts`.
