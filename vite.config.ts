import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Main alias for src
      '@components': path.resolve(__dirname, './src/components'), // Alias for components
      '@hooks': path.resolve(__dirname, './src/hooks'), // Alias for hooks
    },
  },
});
