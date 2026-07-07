import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Clip } from '../types';
import { getClips } from '../services';
import { formatCount } from '../store/useAppStore';
import { IconEye } from '../components/icons';
import { GridSkeleton, EmptyState, ErrorState } from '../components/states';
import { thumbStyle, avatarStyle } from '../lib/thumbs';

export default function Clips() {
  const [clips, setClips] = useState<Clip[] | null>(null);
  const [game, setGame] = useState('전체');
  const [error, setError] = useState(false);

  const load = () => {
    setError(false);
    setClips(null);
    getClips().then(setClips).catch(() => setError(true));
  };

  useEffect(load, []);

  const games = useMemo(
    () => ['전체', ...Array.from(new Set((clips ?? []).map((c) => c.game)))],
    [clips],
  );
  const filtered = useMemo(
    () => (clips ?? []).filter((c) => game === '전체' || c.game === game),
    [clips, game],
  );

  return (
    <>
      <div className="sec-head"><h2>클립 <span className="sub">하이라이트 · 조회수 순</span></h2></div>
      <div className="chips">
        {games.map((g) => (
          <button key={g} className={`chip ${game === g ? 'active' : ''}`} onClick={() => setGame(g)}>{g}</button>
        ))}
      </div>

      {error ? <ErrorState onRetry={load} />
        : !clips ? <GridSkeleton count={6} />
        : filtered.length === 0 ? <EmptyState title="클립이 없습니다" />
        : (
          <div className="grid-3">
            {filtered.map((c) => (
              <Link key={c.id} to={`/channel/${c.channelId}`} className="live-card clip-card">
                <div className={`thumb ${c.thumb}`} style={thumbStyle(c.game)}>
                  <span className="dur">{c.duration}</span>
                  <span className="viewers"><IconEye /> {formatCount(c.views)}</span>
                </div>
                <div className="body">
                  <div className="game">{c.game}</div>
                  <h3>{c.title}</h3>
                  <div className="who"><span className="avatar" style={avatarStyle(c.channelId)} /> {c.channelName}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
    </>
  );
}
