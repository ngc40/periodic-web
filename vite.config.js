import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import polyfillNode from 'rollup-plugin-polyfill-node';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), polyfillNode()],
  server: {
    host: '0.0.0.0',
    port: '8888',
  },
  optimizeDeps: {
    exclude: ['web3'], // <= The libraries that need shimming should be excluded from dependency optimization.
  },
});
