import { useNavigate } from 'react-router-dom';
import { SCHEDULE, SCHEDULE_HOURS } from '../mocks/data';
import { avatarStyle } from '../lib/thumbs';

const UNIT = 100 / 6; // 6 시간 칸

export default function Schedule() {
  const navigate = useNavigate();
  // 스트리머별로 프로그램 그룹핑 (편성표 행)
  const channels = Array.from(new Set(SCHEDULE.map((p) => p.channelId)));

  return (
    <div className="sched">
      <div className="sched-scroll">
        <div className="time">
          <span>스트리머</span>
          {SCHEDULE_HOURS.map((h) => <span key={h}>{h}</span>)}
        </div>
        {channels.map((cid) => {
          const progs = SCHEDULE.filter((p) => p.channelId === cid);
          const name = progs[0].channelName;
          const anyLive = progs.some((p) => p.live);
          return (
            <div className="srow" key={cid}>
              <div className="sname">
                <span className="avatar" style={avatarStyle(cid)} /> {name}
                {anyLive && <span className="lv" />}
              </div>
              <div className="track">
                {progs.map((p, i) => (
                  <button
                    key={i}
                    className={`prog${p.live ? ' live' : ''}`}
                    style={{ left: `${p.start * UNIT}%`, width: `${p.span * UNIT}%` }}
                    onClick={() => navigate(`/channel/${p.channelId}`)}
                    aria-label={`${p.title} — ${p.channelName} 채널로 이동`}
                  >
                    <b>{p.title}</b>
                    <span>{p.game}{p.live ? ' · 지금 방송 중' : ''}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
