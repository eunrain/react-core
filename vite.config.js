import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        presets: [
          [
            '@babel/preset-react',
            {
              runtime: 'automatic', // JSX 자동 변환 (React 17 이상)
              importSource: 'react', // import 경로 설정
            },
          ],
        ],
      },
    }),
  ],
});
