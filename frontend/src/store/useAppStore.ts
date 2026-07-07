import { create } from 'zustand';

// 클라이언트 상태 — 팔로우(익명, 세션 내 유지) + 검색어. 서버 상태 없음(Mock).
interface AppState {
  followed: string[];
  query: string;
  toggleFollow: (channelId: string) => void;
  isFollowed: (channelId: string) => boolean;
  setQuery: (q: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  followed: [],
  query: '',
  toggleFollow: (channelId) =>
    set((s) => ({
      followed: s.followed.includes(channelId)
        ? s.followed.filter((id) => id !== channelId)
        : [...s.followed, channelId],
    })),
  isFollowed: (channelId) => get().followed.includes(channelId),
  setQuery: (q) => set({ query: q }),
}));

export const formatCount = (n: number): string =>
  n >= 10000 ? `${(n / 10000).toFixed(1)}만` : n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);
