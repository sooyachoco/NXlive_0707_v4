import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { Channel as Ch, Clip, LiveStream } from '../types';
import { getChannelById, getStreamsByChannel, getClipsByChannel } from '../services';
import { useAppStore, formatCount } from '../store/useAppStore';
import { IconEye } from '../components/icons';
import { EmptyState, ErrorState } from '../components/states';
import { thumbStyle, avatarStyle, bannerStyle } from '../lib/thumbs';

export default function Channel() {
  const { channelId } = useParams();
  const [channel, setChannel] = useState<Ch | null>(null);
  const [streams, setStreams] = useState<LiveStream[]>([]);
  const [clips, setClips] = useState<Clip[]>([]);
  const [tab, setTab] = useState<'live' | 'clips'>('live');
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const { isFollowed, toggleFollow } = useAppStore();
  const followed = channel ? isFollowed(channel.id) : false;

  const load = () => {
    setLoaded(false);
    setError(false);
    getChannelById(channelId!).then((c) => { setChannel(c); setLoaded(true); }).catch(() => setError(true));
    getStreamsByChannel(channelId!).then(setStreams).catch(() => {});
    getClipsByChannel(channelId!).then(setClips).catch(() => {});
  };

  useEffect(load, [channelId]);

  if (error) return <ErrorState onRetry={load} />;
  if (loaded && !channel) return <EmptyState title="채널을 찾을 수 없습니다" />;
  if (!channel) return <div className="skeleton" style={{ height: 180, borderRadius: 18 }} />;

  return (
    <>
      <div className="ch-banner" style={bannerStyle(channel.id)}>
        <span className={`avatar ch-avatar ${channel.avatarTone}`} style={avatarStyle(channel.id)} />
      </div>
      <div className="channel-head">
        <div className="ch-meta">
          <h1>{channel.displayName}{channel.isLive && <span className="badge-live"><span className="dot" /> LIVE</span>}</h1>
          <p>{channel.game} · 팔로워 {formatCount(channel.followers)}</p>
        </div>
        <button className="btn-primary ch-follow" style={followed ? { background: 'var(--bc-700)' } : undefined} onClick={() => toggleFollow(channel.id)}>
          {followed ? '팔로잉' : '+ 팔로우'}
        </button>
      </div>

      <p className="ch-bio">{channel.bio}</p>

      <div className="tabs">
        <button className={tab === 'live' ? 'active' : ''} onClick={() => setTab('live')}>방송 ({streams.length})</button>
        <button className={tab === 'clips' ? 'active' : ''} onClick={() => setTab('clips')}>클립 ({clips.length})</button>
      </div>

      {tab === 'live' && (
        streams.length === 0
          ? <EmptyState title="진행 중인 방송이 없습니다" desc="다음 방송 편성을 기다려주세요." />
          : <div className="grid-3">
              {streams.map((s) => (
                <Link key={s.id} to={`/watch/${s.id}`} className="live-card">
                  <div className={`thumb ${s.thumb}`} style={thumbStyle(s.game)}>
                    {channel.isLive && <span className="badge-live"><span className="dot" /> LIVE</span>}
                    <span className="viewers"><IconEye /> {s.viewers.toLocaleString()}</span>
                  </div>
                  <div className="body"><div className="game">{s.game}</div><h3>{s.title}</h3></div>
                </Link>
              ))}
            </div>
      )}

      {tab === 'clips' && (
        clips.length === 0
          ? <EmptyState title="등록된 클립이 없습니다" />
          : <div className="grid-3">
              {clips.map((c) => (
                <div key={c.id} className="live-card clip-card">
                  <div className={`thumb ${c.thumb}`} style={thumbStyle(c.game)}>
                    <span className="dur">{c.duration}</span>
                    <span className="viewers"><IconEye /> {formatCount(c.views)}</span>
                  </div>
                  <div className="body"><div className="game">{c.game}</div><h3>{c.title}</h3></div>
                </div>
              ))}
            </div>
      )}
    </>
  );
}
