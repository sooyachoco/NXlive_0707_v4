import type { Game, Channel, LiveStream, Clip, ChatMessage, ScheduleProgram } from '../types';

// spec.md 사용자 시나리오 기반 더미 데이터 (Mock 전용 — VITE_USE_MOCK=true)

export const GAMES: Game[] = [
  { id: 'maple', name: '메이플스토리', liveCount: 312 },
  { id: 'fco', name: 'FC 온라인', liveCount: 208 },
  { id: 'dnf', name: '던전앤파이터', liveCount: 174 },
  { id: 'sa', name: '서든어택', liveCount: 96 },
  { id: 'kart', name: '카트라이더', liveCount: 88 },
  { id: 'mabi', name: '마비노기', liveCount: 54 },
  { id: 'esports', name: 'e스포츠', liveCount: 41 },
];

export const CHANNELS: Channel[] = [
  { id: 'c1', handle: 'danpung', displayName: '단풍국_지존', game: '메이플스토리', followers: 128000, isLive: true, bio: '메이플 15년차. 검은마법사·하드 보스 위주 방송. 매일 저녁 8시 정규.', avatarTone: 'g1' },
  { id: 'c2', handle: 'gangrim', displayName: '강림_dnf', game: '던전앤파이터', followers: 96000, isLive: true, bio: '던파 레이드 최속 트라이 전문. 시청자 파티 환영.', avatarTone: 'g3' },
  { id: 'c3', handle: 'nohyun', displayName: '감독_노현', game: 'FC 온라인', followers: 74000, isLive: true, bio: 'FC 온라인 감독전 랭커. e스포츠 중계 겸업.', avatarTone: 'g2' },
  { id: 'c4', handle: 'booster', displayName: '부스터_한', game: '카트라이더', followers: 61000, isLive: true, bio: '카트 드리프트 스피드전 랭커. 신맵 신기록 도전.', avatarTone: 'g4' },
  { id: 'c5', handle: 'headshot', displayName: '헤드샷_킴', game: '서든어택', followers: 43000, isLive: true, bio: '서든 클랜전 위주. 에임 강좌 주말 진행.', avatarTone: 'g2' },
  { id: 'c6', handle: 'lala', displayName: '음유시인_라라', game: '마비노기', followers: 38000, isLive: true, bio: '마비노기 모바일 신규 지역 탐험 & 힐링 방송.', avatarTone: 'g5' },
];

export const LIVE_STREAMS: LiveStream[] = [
  { id: 's1', title: '검은마법사 하드 첫 트라이 생방송', game: '메이플스토리', channelId: 'c1', channelName: '단풍국_지존', viewers: 24713, thumb: 'g1', startedAt: '2026-07-06T11:20:00+09:00' },
  { id: 's2', title: '감독전 e스포츠 8강 생중계', game: 'FC 온라인', channelId: 'c3', channelName: '감독_노현', viewers: 15320, thumb: 'g2', startedAt: '2026-07-06T12:00:00+09:00' },
  { id: 's3', title: '100제 최속 클리어 도전', game: '던전앤파이터', channelId: 'c2', channelName: '강림_dnf', viewers: 18200, thumb: 'g3', startedAt: '2026-07-06T10:40:00+09:00' },
  { id: 's4', title: '드리프트 스피드전 랭커 매치', game: '카트라이더', channelId: 'c4', channelName: '부스터_한', viewers: 9120, thumb: 'g4', startedAt: '2026-07-06T13:10:00+09:00' },
  { id: 's5', title: '모바일 신규 던전 공략', game: '마비노기', channelId: 'c6', channelName: '음유시인_라라', viewers: 4210, thumb: 'g5', startedAt: '2026-07-06T13:30:00+09:00' },
  { id: 's6', title: '클랜전 결승 · 풀옵 대결', game: '서든어택', channelId: 'c5', channelName: '헤드샷_킴', viewers: 6540, thumb: 'g2', startedAt: '2026-07-06T12:40:00+09:00' },
];

export const CLIPS: Clip[] = [
  { id: 'k1', title: '역전 드리프트 결승선 0.1초', game: '카트라이더', channelId: 'c4', channelName: '부스터_한', views: 88000, duration: '0:42', thumb: 'g4' },
  { id: 'k2', title: '솔로 검은마법사 클리어 순간', game: '메이플스토리', channelId: 'c1', channelName: '단풍국_지존', views: 61000, duration: '1:05', thumb: 'g1' },
  { id: 'k3', title: '인저리타임 극장골', game: 'FC 온라인', channelId: 'c3', channelName: '감독_노현', views: 47000, duration: '0:28', thumb: 'g2' },
  { id: 'k4', title: '레이드 페이즈 원킬', game: '던전앤파이터', channelId: 'c2', channelName: '강림_dnf', views: 33000, duration: '0:51', thumb: 'g3' },
  { id: 'k5', title: '1v4 클러치 에이스', game: '서든어택', channelId: 'c5', channelName: '헤드샷_킴', views: 27000, duration: '0:37', thumb: 'g2' },
  { id: 'k6', title: '레어 드랍 순간', game: '마비노기', channelId: 'c6', channelName: '음유시인_라라', views: 19000, duration: '0:33', thumb: 'g5' },
  { id: 'k7', title: '신맵 신기록 경신', game: '카트라이더', channelId: 'c4', channelName: '부스터_한', views: 15000, duration: '1:12', thumb: 'g4' },
  { id: 'k8', title: '보스 처치 하이라이트 몽타주', game: '메이플스토리', channelId: 'c1', channelName: '단풍국_지존', views: 12000, duration: '2:03', thumb: 'g1' },
];

export const CHAT_SEED: ChatMessage[] = [
  { id: 'm1', user: '초코라떼', text: '오늘 트라이 폼 미쳤다 ㅋㅋㅋ', tone: 'u1' },
  { id: 'm2', user: '메린이', text: '검마 처음 보는데 개무섭네요', tone: 'u2' },
  { id: 'm3', user: '길드원1', text: '데미지 순화 언제 다 하신거임', tone: 'u3' },
  { id: 'm4', user: '눈팅봇', text: '광고 없어서 좋다', tone: 'u4' },
  { id: 'm5', user: '단풍팬', text: '한 번만 더 가면 잡을듯!', tone: 'u1' },
];

export const CHAT_POOL: string[] = [
  'ㄷㄷ 방금 딜 뭐야', '가즈아', '이번엔 진짜 잡는다', '컨트롤 미쳤다',
  'ㅋㅋㅋㅋㅋ', '와 아까웠다', '힐 좀요', '스킬 순서 알려주세요',
  '오늘 몇시까지 하세요?', '팔로우 박고 갑니다', '역시 지존', '풀피에서 어케 죽음',
];
const CHAT_USERS = ['던파고인물', '카트초보', '롤린이', '서든고수', '마비힐러', '눈팅중'];
export const CHAT_TONES: ChatMessage['tone'][] = ['u1', 'u2', 'u3', 'u4'];
export function randomChat(seq: number): ChatMessage {
  const u = CHAT_USERS[seq % CHAT_USERS.length];
  const t = CHAT_POOL[seq % CHAT_POOL.length];
  return { id: `rt-${seq}`, user: u, text: t, tone: CHAT_TONES[seq % CHAT_TONES.length] };
}

// 오늘의 편성표 (start: 0=18:00 ~ 5=23:00, span: 칸 수)
export const SCHEDULE: ScheduleProgram[] = [
  { channelId: 'c1', channelName: '단풍국_지존', title: '검은마법사 하드 트라이', game: '메이플스토리', start: 0, span: 3, color: 'p8', live: true },
  { channelId: 'c1', channelName: '단풍국_지존', title: '보스 러시 시청자 참여', game: '메이플스토리', start: 3, span: 2, color: 'p5' },
  { channelId: 'c3', channelName: '감독_노현', title: '감독전 8강 생중계', game: 'FC 온라인', start: 1, span: 2, color: 'p6', live: true },
  { channelId: 'c3', channelName: '감독_노현', title: '랭커 감독전 복기', game: 'FC 온라인', start: 4, span: 2, color: 'pg' },
  { channelId: 'c4', channelName: '부스터_한', title: '스피드전 랭커 매치', game: '카트라이더', start: 0, span: 2, color: 'p5', live: true },
  { channelId: 'c4', channelName: '부스터_한', title: '드리프트 정규 리그', game: '카트라이더', start: 3, span: 3, color: 'p8' },
  { channelId: 'c2', channelName: '강림_dnf', title: '100제 최속 클리어 도전', game: '던전앤파이터', start: 2, span: 3, color: 'p6', live: true },
];
export const SCHEDULE_HOURS = ['18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
