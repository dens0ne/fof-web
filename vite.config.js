import vue from '@vitejs/plugin-vue'

export default {
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    hmr: {
      port: 443,
      overlay: false
    }
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  }
}

