import vue from '@vitejs/plugin-vue'

/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    hmr: {
      port: 443,
    }
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  // root: './',     
  //   build: {       
  //      outDir: 'dist',
  //           },     
  //   publicDir: 'public'
}

// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()]
// })
