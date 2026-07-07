import { Link, useLocation } from 'react-router-dom';
import { IconBroadcast, IconPad, IconClip, IconChat, IconTrophy, IconSearch } from './icons';
import type { ReactNode } from 'react';

interface NavItem {
  label: string;
  icon: ReactNode;
  to: string;
  match?: string;   // active 판정 기준 (없으면 하이라이트 안 함 = 바로가기)
  count?: number;
}

const NAV: NavItem[] = [
  { label: '홈', icon: <IconBroadcast />, to: '/', match: '/' },
  { label: '게임', icon: <IconPad />, to: '/search' },
  { label: '클립', icon: <IconClip />, to: '/clips', match: '/clips' },
  { label: '채널', icon: <IconChat />, to: '/channel/c1', match: '/channel', count: 6 },
  { label: 'e스포츠', icon: <IconTrophy />, to: '/search' },
  { label: '검색', icon: <IconSearch />, to: '/search', match: '/search' },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  const isActive = (m?: string) =>
    m === '/' ? pathname === '/' : m ? pathname.startsWith(m) : false;

  return (
    <aside className="rail">
      <Link to="/" className="logo" aria-label="NXlive 홈">
        NX<b>live</b>
      </Link>
      {NAV.map((n, i) => (
        <Link key={i} to={n.to} className={`item${isActive(n.match) ? ' active' : ''}`}>
          {n.icon}
          {n.label}
          {n.count != null && <span className="count">{n.count}</span>}
        </Link>
      ))}
    </aside>
  );
}
