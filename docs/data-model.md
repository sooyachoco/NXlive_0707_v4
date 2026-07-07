# 데이터 모델 — NXlive MVP

> MVP는 DB 없음. 아래는 `frontend/src/types/index.ts`에서 확정된 엔티티 스키마(Mock 기준).
> Phase 2(실제 API) 진행 시 이 모델이 백엔드 스키마 역설계 기준이 된다.

## 엔티티

### Game
| 필드 | 타입 | 설명 |
|---|---|---|
| id | string | 게임 식별자 (maple, fco, dnf …) |
| name | string | 표시명 |
| liveCount | number | 현재 라이브 수 |

### Channel (스트리머)
| 필드 | 타입 | 설명 |
|---|---|---|
| id | string | 채널 식별자 (c1 …) |
| handle | string | slug |
| displayName | string | 표시명 |
| game | string | 대표 게임 |
| followers | number | 팔로워 수 |
| isLive | boolean | 방송 중 여부 |
| bio | string | 소개 |
| avatarTone | ThumbTone | 아바타 그라디언트 |

### LiveStream
| 필드 | 타입 | 설명 |
|---|---|---|
| id | string | 스트림 식별자 (s1 …) |
| title | string | 방송 제목 |
| game | string | 게임 |
| channelId / channelName | string | 소속 채널 |
| viewers | number | 실시간 시청자 |
| thumb | ThumbTone | 썸네일(Mock) |
| startedAt | string(ISO) | 시작 시각 |

### Clip
id, title, game, channelId, channelName, views(number), duration(string "0:42"), thumb(ThumbTone)

### ChatMessage
id, user(string), text(string), tone('u1'|'u2'|'u3'|'u4')

### ScheduleProgram
channelId, channelName, title, game, start(0~5), span(number), color('p8'|'p6'|'p5'|'pg'), live?(boolean)

## 관계
- Channel 1 — N LiveStream (channelId)
- Channel 1 — N Clip (channelId)
- LiveStream N — 1 Game (game)
- ScheduleProgram N — 1 Channel

## 공통 타입
- `ThumbTone = 'g1'|'g2'|'g3'|'g4'|'g5'` (Mock 썸네일 그라디언트)
