import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Channel, LiveStream } from '../types';
import { getLiveStreams, getChannels } from '../services';
import { IconEye } from '../components/icons';
import LiveCard from '../components/LiveCard';
import StreamerCard from '../components/StreamerCard';
import Schedule from '../components/Schedule';
import { GridSkeleton, EmptyState, ErrorState } from '../components/states';
import { thumbStyle, avatarStyle } from '../lib/thumbs';

export default function Home() {
  const [streams, setStreams] = useState<LiveStream[] | null>(null);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [error, setError] = useState(false);

  const load = () => {
    setError(false);
    setStreams(null);
    getLiveStreams().then(setStreams).catch(() => setError(true));
    getChannels().then(setChannels).catch(() => setError(true));
  };

  useEffect(load, []);

  if (error) return <ErrorState onRetry={load} />;

  if (!streams) {
    return (
      <>
        <div className="sec-head"><h2>실시간 라이브</h2></div>
        <GridSkeleton count={3} />
      </>
    );
  }

  if (streams.length === 0) return <EmptyState title="진행 중인 라이브가 없습니다" desc="곧 새로운 방송이 시작됩니다." />;

  const [hero, ...rest] = streams;
  const ranking = rest.slice(0, 3);

  return (
    <>
      {/* 피처: 대표 라이브 + 실시간 랭킹 */}
      <div className="feature">
        <Link to={`/watch/${hero.id}`} className={`hero thumb ${hero.thumb}`} style={thumbStyle(hero.game)}>
          <div className="ov">
            <span className="badge-live"><span className="dot" /> LIVE</span>
            <div>
              <h1>{hero.title}</h1>
              <div className="who">
                <span className="avatar" style={avatarStyle(hero.channelId)} />
                <div><b>{hero.channelName}</b> · {hero.game}</div>
                <span style={{ marginLeft: 6 }}>{hero.viewers.toLocaleString()}명 시청 중</span>
              </div>
            </div>
          </div>
        </Link>
        <div className="rank">
          {ranking.map((s) => (
            <Link key={s.id} to={`/watch/${s.id}`} className="row">
              <div className={`thumb ${s.thumb}`} style={thumbStyle(s.game)} />
              <div>
                <div className="game">{s.game}</div>
                <h3>{s.title}</h3>
                <div className="m"><IconEye /> {s.viewers.toLocaleString()}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 실시간 라이브 */}
      <div className="sec-head"><h2>실시간 라이브</h2><Link to="/search">전체 보기</Link></div>
      <div className="grid-3" style={{ marginBottom: 36 }}>
        {streams.map((s) => <LiveCard key={s.id} stream={s} />)}
      </div>

      {/* 인기 스트리머 */}
      <div className="sec-head">
        <h2>인기 스트리머 <span className="sub">지금 방송 중 · 팔로워 순</span></h2>
        <Link to="/search">전체 보기</Link>
      </div>
      <div className="streamers">
        {channels.slice(0, 5).map((c) => <StreamerCard key={c.id} channel={c} />)}
      </div>

      {/* 오늘의 편성표 */}
      <div className="sec-head">
        <h2>오늘의 편성표 <span className="sub">7월 6일 (일)</span></h2>
        <span className="sub">주간 편성표 준비 중</span>
      </div>
      <Schedule />
    </>
  );
}
