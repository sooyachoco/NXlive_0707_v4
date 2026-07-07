import { Link } from 'react-router-dom';
import type { LiveStream } from '../types';
import { IconEye } from './icons';
import { formatCount } from '../store/useAppStore';
import { thumbStyle, avatarStyle } from '../lib/thumbs';

export default function LiveCard({ stream }: { stream: LiveStream }) {
  return (
    <Link to={`/watch/${stream.id}`} className="live-card">
      <div className={`thumb ${stream.thumb}`} style={thumbStyle(stream.game)}>
        <span className="badge-live"><span className="dot" /> LIVE</span>
        <span className="viewers"><IconEye /> {formatCount(stream.viewers)}</span>
      </div>
      <div className="body">
        <div className="game">{stream.game}</div>
        <h3>{stream.title}</h3>
        <div className="who"><span className="avatar" style={avatarStyle(stream.channelId)} /> {stream.channelName}</div>
      </div>
    </Link>
  );
}
