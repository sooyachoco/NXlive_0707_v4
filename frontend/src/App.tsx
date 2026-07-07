import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Home from './pages/Home';
import Watch from './pages/Watch';
import Channel from './pages/Channel';
import Clips from './pages/Clips';
import Search from './pages/Search';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/watch/:streamId" element={<Watch />} />
          <Route path="/channel/:channelId" element={<Channel />} />
          <Route path="/clips" element={<Clips />} />
          <Route path="/search" element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
