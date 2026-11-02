import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';

const bookAssets = resolve(tmpdir(), 'forgotten-foods-heritage-stage');

export default defineConfig({
  plugins: [react()],
  publicDir: resolve(bookAssets, 'public'),
  server: {
    fs: { allow: [process.cwd(), bookAssets] },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
});
