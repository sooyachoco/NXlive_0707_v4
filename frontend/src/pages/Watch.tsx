import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { ChatMessage, Channel, LiveStream } from '../types';
import { getStreamById, getChannelById, getLiveStreams } from '../services';
import { CHAT_SEED, randomChat } from '../mocks/data';
import { IconPlay, IconEye } from '../components/icons';
import { EmptyState, ErrorState } from '../components/states';
import { thumbStyle, avatarStyle } from '../lib/thumbs';

export default function Watch() {
  const { streamId } = useParams();
  const [stream, setStream] = useState<LiveStream | null>(null);
  const [channel, setChannel] = useState<Channel | null>(null);
  const [others, setOthers] = useState<LiveStream[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>(CHAT_SEED);
  const [input, setInput] = useState('');
  const bodyRef = useRef<HTMLDivElement>(null);
  const seq = useRef(0);

  const load = () => {
    setLoaded(false);
    setError(false);
    getStreamById(streamId!).then((s) => {
      setStream(s);
      setLoaded(true);
      if (s) getChannelById(s.channelId).then(setChannel).catch(() => {});
    }).catch(() => setError(true));
    getLiveStreams()
      .then((all) => setOthers(all.filter((s) => s.id !== streamId).slice(0, 4)))
      .catch(() => {});
  };

  useEffect(load, [streamId]);

  // Mock 실시간 채팅 — 2.6초마다 자동 추가
  useEffect(() => {
    const t = setInterval(() => {
      seq.current += 1;
      setMessages((m) => [...m.slice(-40), randomChat(seq.current)]);
    }, 2600);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages]);

  const send = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((m) => [...m, { id: `me-${Date.now()}`, user: '나', text: input, tone: 'u1' }]);
    setInput('');
  };

  if (error) return <ErrorState onRetry={load} />;
  if (loaded && !stream) return <EmptyState title="방송을 찾을 수 없습니다" desc="종료되었거나 잘못된 주소입니다." />;
  if (!stream) return <div className="skeleton" style={{ height: 420, borderRadius: 16 }} />;

  return (
    <div className="watch">
      <div>
        <div className="player" style={thumbStyle(stream.game)}>
          <span className="badge-live"><span className="dot" /> ON AIR</span>
          <div className="plc"><IconPlay /><span>Mock 플레이어 — {stream.game}</span></div>
        </div>
        <div className="watch-info">
          <h1>{stream.title}</h1>
          <div className="watch-meta">
            <Link to={`/channel/${stream.channelId}`} className="avatar" style={{ width: 46, height: 46, ...avatarStyle(stream.channelId) }} aria-label="채널" />
            <div>
              <div className="n">
                <Link to={`/channel/${stream.channelId}`}>{stream.channelName}</Link>
              </div>
              <div className="g">{stream.game}{channel ? ` · 팔로워 ${channel.followers.toLocaleString()}` : ''}</div>
            </div>
            <div className="stat">
              <div><div className="v">{stream.viewers.toLocaleString()}</div><div className="l">시청자</div></div>
              <div><div className="v">03:41</div><div className="l">방송 시간</div></div>
            </div>
          </div>
        </div>

        <div className="sec-head" style={{ marginTop: 30 }}><h2>추천 라이브</h2></div>
        <div className="grid-4">
          {others.map((s) => (
            <Link key={s.id} to={`/watch/${s.id}`} className="live-card">
              <div className={`thumb ${s.thumb}`} style={thumbStyle(s.game)}>
                <span className="viewers"><IconEye /> {s.viewers.toLocaleString()}</span>
              </div>
              <div className="body"><div className="game">{s.game}</div><h3>{s.title}</h3></div>
            </Link>
          ))}
        </div>
      </div>

      {/* 실시간 채팅 */}
      <div className="chat">
        <div className="ch-head"><span className="dot" /> 실시간 채팅</div>
        <div className="ch-body" ref={bodyRef}>
          {messages.map((m) => (
            <div key={m.id} className={`msg ${m.tone}`}><b>{m.user}</b>{m.text}</div>
          ))}
        </div>
        <form className="ch-input" onSubmit={send}>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="채팅 입력" aria-label="채팅 입력" />
          <button type="submit">전송</button>
        </form>
      </div>
    </div>
  );
}
