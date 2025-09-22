import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";

export default defineConfig(({ mode }) => {
 const env = loadEnv(mode, process.cwd(), 'lacasadelbarbero.com.co');
  return {
    plugins: [react()], 
    server: {
      proxy: {
        '/api2025': {
          //target: env.VITE_API_URL,
          target: 'https://lacasadelbarbero.com.co',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api2025/, '/api2025'),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              console.log('Proxying to:', proxyReq.path);
            });
            proxy.on('proxyRes', (proxyRes, req, res) => {
              console.log('Response status:', proxyRes.statusCode);
            });
          }
        }
      }
    },
    resolve: {
   alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  define: {
      __API_TOKEN__: JSON.stringify(env.VITE_API_TOKEN),
      __API_USERNAME__: JSON.stringify(env.VITE_API_USERNAME),
      __API_PASSWORD__: JSON.stringify(env.VITE_API_PASSWORD),
    },
    // ...
  }
});