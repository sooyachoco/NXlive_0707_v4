// NXlive 엔티티 타입 — Step 2.8 확정 (UI 승인된 컴포넌트 props 기준). Mock↔API 공용.

export type ThumbTone = 'g1' | 'g2' | 'g3' | 'g4' | 'g5';

export interface Game {
  id: string;
  name: string;
  liveCount: number;
}

export interface Channel {
  id: string;
  handle: string;        // @handle 없이 표시명 slug
  displayName: string;
  game: string;
  followers: number;
  isLive: boolean;
  bio: string;
  avatarTone: string;    // 아바타 그라디언트 (mock)
}

export interface LiveStream {
  id: string;
  title: string;
  game: string;
  channelId: string;
  channelName: string;
  viewers: number;
  thumb: ThumbTone;
  startedAt: string;     // ISO 8601 문자열 (표시용 — 클라이언트에서 상대시간 변환)
}

export interface Clip {
  id: string;
  title: string;
  game: string;
  channelId: string;
  channelName: string;
  views: number;
  duration: string;      // "0:42"
  thumb: ThumbTone;
}

export interface ChatMessage {
  id: string;
  user: string;
  text: string;
  tone: 'u1' | 'u2' | 'u3' | 'u4';
}

export interface ScheduleProgram {
  channelId: string;
  channelName: string;
  title: string;
  game: string;
  start: number;         // 0~5 (18:00 기준 시간 인덱스)
  span: number;          // 차지하는 시간 칸 수
  color: 'p8' | 'p6' | 'p5' | 'pg';
  live?: boolean;
}
