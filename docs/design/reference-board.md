# 레퍼런스 보드 — NXlive MVP

> 출처: reference-proposal 스킬 · 2026-07-06 · 입력: scenario.md 화면 후보
> 소비처: ui-design-workflow(STEP 0 톤 / STEP 3 발산)
> grounding: WebSearch(스트리밍/벤토/e스포츠) + nxbasic-mcp + 승계 결정

## 1. 기준 톤 (1개 · 확정)
- **NX Basic 1.0v 라이트 + 사이드바** (design/design-direction.md). DESIGN_SYSTEM=nxbasic → 톤 발산 생략.
- 포인트 블루 #0a74ff · Pretendard · type-default 스케일.

## 2. 화면별 인터랙션 레퍼런스 (scenario.md 화면 순, 메인 먼저)
| 화면(job) | 메인? | 레퍼런스 | 가져올 키스톤 | 안 가져올 것 |
|---|:---:|---|---|---|
| **라이브 시청 ★** | ★ | Twitch 시청 / YouTube Live / Chzzk 채팅 | 플레이어 좌 + 실시간 채팅 우 2컬럼, 정보 하단, 추천 | 후원/구독/비트(인증 없음·범위 외) |
| 홈 — 발견 | — | 벤토 발견 그리드 / Twitch 홈 / NX Basic Card+Tag | 히어로+실시간 그리드+편성표 수직 위계, 썸네일 우선 | 항시 채널 레일(과밀), 무한 캐러셀 |
| 채널 — 탐색 | — | Twitch 채널 / YouTube 채널 / NX Basic Tab | 배너+프로필+Tab(방송/클립), 팔로우 CTA 우상단 | 멤버십/상점 탭 |
| 클립 — 소비 | — | YouTube Shorts / Twitch Clips / NX Basic Tag | 카드 그리드 + 게임 필터 칩, 재생시간·조회수 | 세로 풀스크린 스와이프(데스크톱 부적합) |
| 검색 — 검색 | — | Twitch 검색 / YouTube 필터 / NX Basic Search+Tab | 통합결과 + 탭(전체/게임/스트리머/클립), 빈상태 | 고급 필터 패널(MVP 과함) |

## 3. NX Basic 컴포넌트 매핑
| UI | 컴포넌트 |
|---|---|
| 검색 | Search/TextField |
| 채널·검색 탭 | Tab |
| 게임/클립 필터 | Tag |
| 카드 | Card(테두리 제거 변형) |
| 팔로우/CTA | Button(primary #0a74ff) |
| LIVE 배지 | Badge |
| 빈/에러 | Notification |

## 4. 미결 (ui-design-workflow STEP 3에서 확정)
- 편성표 상호작용(주간 전환·클릭 이동), 채팅 밀도/자동스크롤 임계.
