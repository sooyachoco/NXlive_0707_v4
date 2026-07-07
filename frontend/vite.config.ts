import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Mock 데이터 기반 프론트엔드 전용 MVP — 백엔드 프록시(Phase 1 대비)만 예비 설정
// GitHub Pages 배포 경로: https://sooyachoco.github.io/NXlive_0707_v4/
export default defineConfig({
  base: '/NXlive_0707_v4/',
  plugins: [react(), tailwindcss()],
  server: {
    port: 8010,
    host: true,
    proxy: {
      '/api': { target: 'http://localhost:4000', changeOrigin: true },
    },
  },
});
