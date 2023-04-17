import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3030,
    strictPort: true,
    proxy: {
      '^/api/fastapi': {
        target: 'http://localhost:8000',
        rewrite: path => path.replace(/^\/api\/fastapi/, ''),
      },
      '^/api/flask': {
        target: 'http://localhost:5000',
        rewrite: path => path.replace(/^\/api\/flask/, ''),
      },
    },
  },
});
