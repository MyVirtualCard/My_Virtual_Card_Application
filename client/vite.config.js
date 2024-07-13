import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['primereact/editor','react-copy-to-clipboard']
    }
  },
  plugins: [react()],
})

