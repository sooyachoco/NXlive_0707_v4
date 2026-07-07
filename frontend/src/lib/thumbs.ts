import type { CSSProperties } from 'react';

// 게임 → 썸네일 이미지 (magnific 생성, public/thumbs/). BASE_URL로 GitHub Pages 하위경로 대응.
const FILES: Record<string, string> = {
  '메이플스토리': 'maple',
  'FC 온라인': 'fco',
  '던전앤파이터': 'dnf',
  '서든어택': 'sa',
  '카트라이더': 'kart',
  '마비노기': 'mabi',
};

export function gameThumb(game: string): string | undefined {
  const f = FILES[game];
  return f ? `${import.meta.env.BASE_URL}thumbs/${f}.jpg` : undefined;
}

export function thumbStyle(game: string): CSSProperties {
  const url = gameThumb(game);
  return url
    ? { backgroundImage: `url("${url}")`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : {};
}

// 채널(스트리머) → 아바타 이미지 (magnific 생성, public/avatars/cN.jpg)
export function avatarStyle(channelId: string): CSSProperties {
  return {
    backgroundImage: `url("${import.meta.env.BASE_URL}avatars/${channelId}.jpg")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
}

// 채널 상단 배너 이미지 (magnific 생성, public/banners/cN.jpg)
export function bannerStyle(channelId: string): CSSProperties {
  return {
    backgroundImage: `url("${import.meta.env.BASE_URL}banners/${channelId}.jpg")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
}
