import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  esbuild: {
    jsxFactory: 'createElement', // JSX를 createElement로 변환
    jsxInject: `import createElement from '@/lib/createElement.js'`, // createElement 자동 임포트
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // `@`를 `src/`로 매핑
    },
  },
});
