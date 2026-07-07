import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { search, type SearchResult } from '../services';
import { formatCount } from '../store/useAppStore';
import { IconEye } from '../components/icons';
import { GridSkeleton, EmptyState, ErrorState } from '../components/states';
import { thumbStyle } from '../lib/thumbs';

type Tab = '전체' | '게임' | '스트리머' | '클립';

export default function Search() {
  const [params] = useSearchParams();
  const q = params.get('q') ?? '';
  const [res, setRes] = useState<SearchResult | null>(null);
  const [tab, setTab] = useState<Tab>('전체');
  const [error, setError] = useState(false);

  useEffect(() => {
    setRes(null);
    setError(false);
    search(q).then(setRes).catch(() => setError(true));
  }, [q]);

  if (!q.trim()) return <EmptyState title="검색어를 입력하세요" desc="게임 · 스트리머 · 클립을 통합 검색합니다." />;
  if (error) return <ErrorState onRetry={() => { setError(false); setRes(null); search(q).then(setRes).catch(() => setError(true)); }} />;
  if (!res) return <><div className="sec-head"><h2>‘{q}’ 검색 중…</h2></div><GridSkeleton count={3} /></>;

  const total = res.games.length + res.channels.length + res.clips.length;
  if (total === 0) return <EmptyState title={`‘${q}’ 검색 결과가 없습니다`} desc="다른 키워드로 검색해보세요." />;

  const showGames = tab === '전체' || tab === '게임';
  const showCh = tab === '전체' || tab === '스트리머';
  const showClips = tab === '전체' || tab === '클립';

  return (
    <>
      <div className="sec-head"><h2>‘{q}’ 검색 결과 <span className="sub">{total}건</span></h2></div>
      <div className="tabs">
        {(['전체', '게임', '스트리머', '클립'] as Tab[]).map((t) => (
          <button key={t} className={tab === t ? 'active' : ''} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      {showGames && res.games.length > 0 && (
        <>
          <div className="sec-head"><h2>게임</h2></div>
          <div className="chips" style={{ marginBottom: 30 }}>
            {res.games.map((g) => <Link key={g.id} to="/" className="chip">{g.name} · {g.liveCount} 라이브</Link>)}
          </div>
        </>
      )}

      {showCh && res.channels.length > 0 && (
        <>
          <div className="sec-head"><h2>스트리머</h2></div>
          <div className="grid-4" style={{ marginBottom: 30 }}>
            {res.channels.map((c) => (
              <Link key={c.id} to={`/channel/${c.id}`} className="live-card">
                <div className={`thumb ${c.avatarTone}`} style={{ height: 110, ...thumbStyle(c.game) }}>
                  {c.isLive && <span className="badge-live"><span className="dot" /> LIVE</span>}
                </div>
                <div className="body"><div className="game">{c.game}</div><h3>{c.displayName}</h3>
                  <div className="who">팔로워 {formatCount(c.followers)}</div></div>
              </Link>
            ))}
          </div>
        </>
      )}

      {showClips && res.clips.length > 0 && (
        <>
          <div className="sec-head"><h2>클립</h2></div>
          <div className="grid-3">
            {res.clips.map((c) => (
              <Link key={c.id} to={`/channel/${c.channelId}`} className="live-card clip-card">
                <div className={`thumb ${c.thumb}`} style={thumbStyle(c.game)}>
                  <span className="dur">{c.duration}</span>
                  <span className="viewers"><IconEye /> {formatCount(c.views)}</span>
                </div>
                <div className="body"><div className="game">{c.game}</div><h3>{c.title}</h3></div>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
}
