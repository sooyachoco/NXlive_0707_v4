import type { Channel, Clip, Game, LiveStream } from '../types';
import { CHANNELS, CLIPS, GAMES, LIVE_STREAMS } from '../mocks/data';

// Mock ↔ 실제 API 전환 게이트. 백엔드 부재 MVP 기본값은 Mock ON —
// VITE_USE_MOCK 을 명시적으로 "false" 로 설정할 때만 실제 API(fetch) 경로 사용.
// (.env.local 은 gitignore 대상이라, 새 클론에서 미설정 시에도 앱이 동작하도록 기본 Mock)
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';
const delay = <T,>(value: T, ms = 220): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

export async function getLiveStreams(): Promise<LiveStream[]> {
  if (USE_MOCK) return delay([...LIVE_STREAMS]);
  return (await fetch('/api/streams')).json();
}

export async function getStreamById(id: string): Promise<LiveStream | null> {
  if (USE_MOCK) return delay(LIVE_STREAMS.find((s) => s.id === id) ?? null);
  return (await fetch(`/api/streams/${id}`)).json();
}

export async function getChannelById(id: string): Promise<Channel | null> {
  if (USE_MOCK) return delay(CHANNELS.find((c) => c.id === id) ?? null);
  return (await fetch(`/api/channels/${id}`)).json();
}

export async function getChannels(): Promise<Channel[]> {
  if (USE_MOCK) return delay([...CHANNELS]);
  return (await fetch('/api/channels')).json();
}

export async function getStreamsByChannel(channelId: string): Promise<LiveStream[]> {
  if (USE_MOCK) return delay(LIVE_STREAMS.filter((s) => s.channelId === channelId));
  return (await fetch(`/api/channels/${channelId}/streams`)).json();
}

export async function getClips(): Promise<Clip[]> {
  if (USE_MOCK) return delay([...CLIPS]);
  return (await fetch('/api/clips')).json();
}

export async function getClipsByChannel(channelId: string): Promise<Clip[]> {
  if (USE_MOCK) return delay(CLIPS.filter((c) => c.channelId === channelId));
  return (await fetch(`/api/channels/${channelId}/clips`)).json();
}

export async function getGames(): Promise<Game[]> {
  if (USE_MOCK) return delay([...GAMES]);
  return (await fetch('/api/games')).json();
}

export interface SearchResult {
  games: Game[];
  channels: Channel[];
  clips: Clip[];
}

export async function search(query: string): Promise<SearchResult> {
  const q = query.trim().toLowerCase();
  if (USE_MOCK) {
    if (!q) return delay({ games: [], channels: [], clips: [] });
    const match = (s: string) => s.toLowerCase().includes(q);
    return delay({
      games: GAMES.filter((g) => match(g.name)),
      channels: CHANNELS.filter((c) => match(c.displayName) || match(c.game)),
      clips: CLIPS.filter((c) => match(c.title) || match(c.game) || match(c.channelName)),
    });
  }
  return (await fetch(`/api/search?q=${encodeURIComponent(query)}`)).json();
}
