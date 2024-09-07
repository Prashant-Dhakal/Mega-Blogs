import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/user': {
        target: 'http://localhost:3000', // Replace with your backend server URL
        changeOrigin: true,
        secure: false, // Set this to true if you're using HTTPS
        rewrite: (path) => path.replace(/^\/user/, '/user')
      },
    },
  },
})
