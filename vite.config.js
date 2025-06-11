import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  esbuild: {
    jsxFactory: 'createElement',
    jsxFragment: 'Fragment',
    jsxInject: `import {createElement, Fragment} from '@/lib/createElement.js'`,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
