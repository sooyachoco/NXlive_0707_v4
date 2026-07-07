import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconSearch } from './icons';
import { useAppStore } from '../store/useAppStore';

export default function TopBar() {
  const navigate = useNavigate();
  const setQuery = useAppStore((s) => s.setQuery);
  const [text, setText] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setQuery(text);
    navigate(`/search?q=${encodeURIComponent(text)}`);
  };

  return (
    <div className="topbar">
      <form className="search" onSubmit={submit} role="search">
        <IconSearch />
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="게임·스트리머·클립 검색"
          aria-label="검색"
        />
      </form>
      <button className="btn-primary" onClick={() => navigate('/')}>
        라이브 둘러보기
      </button>
    </div>
  );
}
