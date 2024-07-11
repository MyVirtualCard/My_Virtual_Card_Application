import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Expose the server to the network (optional)
    port: 3001, // Specify the port (optional)
    proxy: {
      // Proxy API requests to the backend server
      '/api': {
        target: process.env.VITE_APP_API_URL, // Replace with your backend server address
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove /api prefix when forwarding to the backend
      },
    },
  },
})

