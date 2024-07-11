import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Expose the server to the network (optional)
    port: 3001, // Specify the port (optional)
    proxy: {
      // Proxy API requests to the backend server
      '/': {
        target: 'https://www.api.myvirtualcard.in', // Replace with your backend server address
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ /, ''), // Remove /api prefix when forwarding to the backend
      },
    },
  },
})

