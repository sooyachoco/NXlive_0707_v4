// 도메인 인라인 SVG 아이콘 — design/samples.html에서 이식
import type { ReactNode } from 'react';
type P = { className?: string };
const S = (p: P & { children: ReactNode }) => (
  <svg viewBox="0 0 24 24" className={p.className} aria-hidden="true">{p.children}</svg>
);

export const IconEye = (p: P) => (
  <S {...p}><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" strokeWidth="1.8" /><circle cx="12" cy="12" r="3" strokeWidth="1.8" /></S>
);
export const IconPad = (p: P) => (
  <S {...p}><rect x="2" y="7" width="20" height="10" rx="5" strokeWidth="1.8" /><path d="M7 12h3M8.5 10.5v3M15 11h.01M17.5 13h.01" strokeWidth="1.8" strokeLinecap="round" /></S>
);
export const IconClip = (p: P) => (
  <S {...p}><rect x="3" y="5" width="18" height="14" rx="3" strokeWidth="1.8" /><path d="M10 9l5 3-5 3V9z" strokeWidth="1.6" strokeLinejoin="round" /></S>
);
export const IconChat = (p: P) => (
  <S {...p}><path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.5A8 8 0 1 1 21 12z" strokeWidth="1.8" strokeLinejoin="round" /></S>
);
export const IconBroadcast = (p: P) => (
  <S {...p}><circle cx="12" cy="12" r="2.5" strokeWidth="1.8" /><path d="M6.5 6.5a8 8 0 0 0 0 11M17.5 6.5a8 8 0 0 1 0 11M4 4a12 12 0 0 0 0 16M20 4a12 12 0 0 1 0 16" strokeWidth="1.6" /></S>
);
export const IconTrophy = (p: P) => (
  <S {...p}><path d="M6 4h12v3a6 6 0 0 1-12 0V4zM6 6H3v1a4 4 0 0 0 3 3.8M18 6h3v1a4 4 0 0 1-3 3.8M9 20h6M12 15v5" strokeWidth="1.8" strokeLinejoin="round" /></S>
);
export const IconSearch = (p: P) => (
  <S {...p}><circle cx="11" cy="11" r="7" strokeWidth="1.8" /><path d="M20 20l-3.5-3.5" strokeWidth="1.8" strokeLinecap="round" /></S>
);
export const IconPlay = (p: P) => (
  <S {...p}><circle cx="12" cy="12" r="10" strokeWidth="1.6" /><path d="M10 8.5l6 3.5-6 3.5v-7z" strokeWidth="1.5" strokeLinejoin="round" /></S>
);
