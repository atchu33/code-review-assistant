import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/code-review-assistant/',
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  }
})

